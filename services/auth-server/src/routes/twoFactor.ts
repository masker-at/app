import { FastifyInstance } from 'fastify';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { authenticateUserHook, errorHandler, HTTPError } from '@masker-at/http-utils';
import { check2FA, generateRecoveryCodes } from '../utils/twoFactor';
import serializeUser from '../utils/serializeUser';

export default async function twoFactorRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    '/generate-2fa-recovery-codes',
    { preHandler: authenticateUserHook },
    async (req, res) => {
      req.user.twoFactorRecoveryCodes = generateRecoveryCodes();
      await req.user.save();
      await res.send(req.user.twoFactorRecoveryCodes);
    },
  );

  app.post('/generate-2fa-token', { preHandler: authenticateUserHook }, async (req, res) => {
    const { base32, otpauth_url: otpauthURL } = speakeasy.generateSecret({
      name: `Masker@ ${req.user.email}`,
      length: 64,
    });
    req.user.twoFactorToken = base32;
    await req.user.save();

    const qrDataURL = await QRCode.toDataURL(otpauthURL!);

    await res.send({ base32, otpauthURL, qrDataURL });
  });

  app.post<{
    Body: {
      code: string;
    };
  }>(
    '/enable-2fa',
    {
      preHandler: authenticateUserHook,
      schema: {
        body: {
          type: 'object',
          properties: {
            code: { type: 'string', minLength: 6, maxLength: 6 },
          },
          required: ['code'],
        },
      },
    },
    async (req, res) => {
      if (!(await check2FA(req.user, req.body.code))) {
        throw new HTTPError('INVALID_2FA_CODE');
      }

      req.user.is2FAEnabled = true;
      await req.user.save();

      await res.send(serializeUser(req.user));
    },
  );

  app.post<{
    Body: {
      code: string;
    };
  }>(
    '/disable-2fa',
    {
      preHandler: authenticateUserHook,
      schema: {
        body: {
          type: 'object',
          properties: {
            code: { type: 'string', minLength: 6, maxLength: 15 },
          },
          required: ['code'],
        },
      },
    },
    async (req, res) => {
      if (!(await check2FA(req.user, req.body.code))) {
        throw new HTTPError('INVALID_2FA_CODE');
      }

      req.user.is2FAEnabled = false;
      await req.user.save();

      await res.send(serializeUser(req.user));
    },
  );

  app.setErrorHandler(errorHandler);
}
