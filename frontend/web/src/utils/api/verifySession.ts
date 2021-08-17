import apiClient from './client';

export default async function verifySession(): Promise<boolean> {
  try {
    const { data } = await apiClient.get('/verify-session');
    return data.isValid;
  } catch {
    return false;
  }
}
