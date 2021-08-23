import apiClient from './client';
import { User } from './me';

export async function updateEmail(email: string): Promise<User> {
  const { data } = await apiClient.post('/auth/update-email', { email });
  return data;
}

export async function updatePassword(currentPassword: string, newPassword: string): Promise<User> {
  const { data } = await apiClient.post('/auth/update-password', { currentPassword, newPassword });
  return data;
}
