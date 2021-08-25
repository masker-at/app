import apiClient from './client';
import { User } from './me';

export async function generate2FAToken(): Promise<{
  base32: string;
  otpauthURL: string;
  qrDataURL: string;
}> {
  const { data } = await apiClient.post('/auth/generate-2fa-token');
  return data;
}

export async function enable2FA(code: string): Promise<User> {
  const { data } = await apiClient.post('/auth/enable-2fa', { code });
  return data;
}

export async function disable2FA(code: string): Promise<User> {
  const { data } = await apiClient.post('/auth/disable-2fa', { code });
  return data;
}

export async function generateRecoveryCodes(): Promise<string[]> {
  const { data } = await apiClient.post('/auth/generate-2fa-recovery-codes');
  return data;
}
