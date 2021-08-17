import Cookies from 'js-cookie';
import apiClient from './client';

export default async function signUp(email: string, password: string): Promise<void> {
  const { data } = await apiClient.post('/auth/sign-up', { email, password });
  Cookies.set('ct', data.csrfToken, {
    sameSite: 'Lax',
    expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
  });
}
