import apiClient from './client';

export default async function sendPasswordReset(email: string): Promise<string> {
  const { data } = await apiClient.post('/auth/send-password-reset', { email });
  return data.lastPasswordResetSentDate;
}
