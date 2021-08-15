import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '@masker-at/postgres-models';
import PostalAPI from '@masker-at/postal-api';
import HTTPError from '../errors/HTTPError';
import { AuthBody, AuthBodySchema, createAndSendSession } from '../utils/auth';
import errorHandler from '../errors/errorHandler';

const postalAPI = new PostalAPI(process.env.POSTAL_API_BASE_URL!, process.env.POSTAL_API_KEY!);

export default async function signUpRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: AuthBody }>(
    '/sign-up',
    {
      schema: { body: AuthBodySchema },
    },
    async (req, res) => {
      const { email, password } = req.body;
      const passwordHash = await argon2.hash(password);

      try {
        const user = User.create({
          email,
          passwordHash,
          lastEmailVerificationSentDate: new Date(),
        });

        const verificationToken = jwt.sign(
          {
            type: 'EMAIL_VERIFICATION',
            userID: user.id,
          },
          process.env.EMAIL_VERIFICATION_JWT_SECRET!,
          { expiresIn: '1h' },
        );

        await postalAPI.sendMessage({
          from: 'noreply@masker.at',
          to: [email],
          subject: 'Masker@ - email verification',
          plainBody: `Hello there,

You've just signed up for Masker@ (https://www.masker.at). To verify your email address,
please click the following link:
http://localhost:3000/verify-email/${verificationToken}

The link expires in 1 hour. If you need to request a new one, sign in to your account.

If you didn't sign up for Masker@, please ignore this message - someone probably registered with your email by mistake.
`,
        });

        await user.save();

        await createAndSendSession(user, res);
      } catch (err) {
        if (err.code === '23505' && err.detail?.startsWith('Key (email)=(')) {
          throw new HTTPError('USER_ALREADY_EXISTS');
        }
        throw err;
      }
    },
  );

  app.setErrorHandler(errorHandler);
}
