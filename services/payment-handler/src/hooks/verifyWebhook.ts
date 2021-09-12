import crypto from 'crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { serialize } from 'php-serialize';

export default async function verifyWebhook(req: FastifyRequest, res: FastifyReply): Promise<void> {
  const body = req.body as {
    // eslint-disable-next-line camelcase
    p_signature: string;
    [key: string]: unknown;
  };
  if (typeof body.p_signature === 'string') {
    const { p_signature: signatureBase64, ...rest } = body;

    const signatureBuffer = Buffer.from(signatureBase64, 'base64');

    const restSortedKeys: Record<string, unknown> = {};
    for (const key of Object.keys(rest).sort()) {
      if (typeof rest[key] === 'string') {
        restSortedKeys[key] = rest[key];
      } else if (Array.isArray(rest[key])) {
        restSortedKeys[key] = (rest[key] as unknown[]).toString();
      } else {
        restSortedKeys[key] = JSON.stringify(rest[key]);
      }
    }

    const serialized = serialize(restSortedKeys);

    const verifier = crypto.createVerify('sha1');
    verifier.update(serialized);
    verifier.end();

    if (
      verifier.verify(
        '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAy0ypVHPsyY/g/S7wx/ZM\nUjEQgyB9hQCI7rqHk9cIlrYZGhDwW5/CkVYCS6IR3BEjDGgauf86eyvKjDyXc+zj\nZbsgOFGF15BImu0hv2wmGdpAZvECldvQjVNQciuNKeV1VO7kTeHqtJ2r1GOLwV6C\nOjGbNOXWvVphIPtEQVo9JGna+XNle1DbAVACcSrHr6CGCvsa0RkjCSS3Urav3cDj\nDR0gddY02WdW+fiUK4REG9dK9pcV1naxm7iVE/fRiBNCklYuUMbv52glwHfoWABT\niogaFBNKxhVefdy89dKO+m86+tKtkNQIM/mXeqDEn7RhF4l/Eq1SiT10Iiw4v0RL\np50iQRg0pbspwEsGkrNWCrWJ4X+Nf/c7cWGywD98deA0GypBzKQtdgLKYEtWirPO\nZIitK1XjXHQOVBrYhVtsfnWG+nAaRiv53V/2LrQ4Q2HvWGLqr4g9zQko7kgdkO5i\ny6b0OzfZ+oLLNPtHaD5/MefTNkQy5Ufe/Uwa8Oz37Nan6kYvZoHY4NxtDDw/p24y\n2SDk5bRBI2K5amoksqVxMOhCbG7qkkXLZSUbZoXlyJ1tJvDAAy0Ws3UGbLFmYRHN\nbp5iQ7iwP1ff06idjmCAneCmW3zrfbNzJLIF2i2dgpc787pZ5VhCpY6pWBux+SxK\nxSksLw+zEKCZmUgHHFJdCd0CAwEAAQ==\n-----END PUBLIC KEY-----\n',
        signatureBuffer,
      )
    ) {
      return;
    }
  }

  await res.status(400).send('Bad request');
}
