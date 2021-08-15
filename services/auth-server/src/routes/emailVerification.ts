import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import { User } from '@masker-at/postgres-models';

export default async function emailVerificationRoutes(app: FastifyInstance): Promise<void> {
  app.get<{
    Params: {
      token: string;
    };
  }>(
    '/verify-email/:token',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
          required: ['token'],
        },
      },
    },
    async (req, res) => {
      let userID: number;
      try {
        const result = jwt.verify(req.params.token, process.env.EMAIL_VERIFICATION_JWT_SECRET!) as {
          userID: number;
          type: string;
        };
        if (result.type !== 'EMAIL_VERIFICATION') throw new Error();
        ({ userID } = result);
      } catch {
        await res.status(404).send('Not found'); // TODO: Add HTML page
        return;
      }

      const { affected } = await User.update(userID, { isEmailVerified: true });
      if (affected === 0) {
        await res.status(404).send('Not found'); // TODO: Add HTML page
      } else {
        await res.send(
          'Thanks for verifying your email!\nFeel free to close this page and return to Masker@.',
        );
      }
    },
  );

  // app.post<{
  //   Body: { userID: number };
  // }>(
  //   '/resend-email',
  //   {
  //     schema: {
  //       body: {
  //         type: 'object',
  //         properties: {
  //           userID: { type: 'number' },
  //         },
  //         required: ['userID'],
  //       },
  //     },
  //   },
  //   async (req, res) => {},
  // );
}
