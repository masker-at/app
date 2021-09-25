import apiClient from './client';
import { User } from './me';

export default async function switchPlan(plan: 'MONTHLY' | 'ANNUAL'): Promise<User> {
  const { data } = await apiClient.post('/payments/paddle-switch-plan', { plan });
  return data;
}
