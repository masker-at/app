import apiClient from './client';

export default async function pollEmailVerification(): Promise<void> {
  let isEmailVerified = false;
  while (!isEmailVerified) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await apiClient.get('/auth/poll-email-verification');
      isEmailVerified = true;
    } catch {}
  }
}
