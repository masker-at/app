import speakeasy from 'speakeasy';
import { User } from '@masker-at/postgres-models';

const letters = 'abcdefghijklmnopqrstuvwxyz';
export const generateRecoveryCode = (): string => {
  let result = '';
  for (let i = 0; i < 15; i += 1) {
    result += letters[Math.floor(Math.random() * letters.length)];
  }
  return result;
};

export const generateRecoveryCodes = (): string[] =>
  new Array(10).fill(null).map(generateRecoveryCode);

export const check2FA = async (user: User, codeOrRecovery: string): Promise<boolean> => {
  if (/^\d{6}$/.test(codeOrRecovery)) {
    if (!user.twoFactorToken) return false;
    return speakeasy.totp.verify({
      secret: user.twoFactorToken,
      token: codeOrRecovery,
      encoding: 'base32',
    });
  }

  const codeIndex = user.twoFactorRecoveryCodes.indexOf(codeOrRecovery);
  if (codeIndex === -1) return false;
  user.twoFactorRecoveryCodes.splice(codeIndex, 1);
  await user.save();
  return true;
};
