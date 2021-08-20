import apiClient from './client';

export interface Alias {
  id: number;
  address: string;
  name?: string;
  isActive: boolean;
}

export async function listAliases(skip: number, limit: number): Promise<Alias[]> {
  const { data } = await apiClient.get('/aliases/list', {
    params: { skip, limit },
  });
  return data;
}
