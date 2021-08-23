import apiClient from './client';
import { User } from './me';

// eslint-disable-next-line import/prefer-default-export
export async function updateEmail(email: string): Promise<User> {
  const { data } = await apiClient.post('/auth/update-email', { email });
  return data;
}
