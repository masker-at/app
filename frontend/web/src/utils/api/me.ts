import apiClient from './client';

export interface User {
  id: number;
  email: string;
  isEmailVerified: boolean;
  lastEmailVerificationSentDate: string;
  is2FAEnabled: boolean;
}

export default async function me(cookies?: string, csrfToken?: string): Promise<User> {
  const { data } = await apiClient.get('/auth/me', {
    headers: cookies &&
      csrfToken && {
        cookie: cookies,
        'x-csrf-token': csrfToken,
      },
  });
  return data;
}
