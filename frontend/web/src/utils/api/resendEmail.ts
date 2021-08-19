import apiClient from './client';

export default async function resendEmail(): Promise<void> {
  const { data } = await apiClient.post('/auth/resend-email');
  return data.lastEmailVerificationSentDate;
}
