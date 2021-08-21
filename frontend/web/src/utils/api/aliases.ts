import apiClient from './client';

export interface Alias {
  id: number;
  address: string;
  name?: string;
  isActive: boolean;
  isNew?: boolean;
}

export async function listAliases(skip = 0, limit?: number): Promise<Alias[]> {
  const { data } = await apiClient.get('/aliases/list', {
    params: { skip, limit },
  });
  return data;
}

export async function updateAlias(
  id: number,
  updateObject: { name?: string; isActive?: boolean },
): Promise<Alias> {
  const { data } = await apiClient.post(`/aliases/update/${id}`, updateObject);
  return data;
}

export async function createAlias(name?: string): Promise<Alias> {
  const { data } = await apiClient.post('/aliases/create', { name });
  return data;
}

export async function deleteAlias(id: number): Promise<Alias> {
  const { data } = await apiClient.delete(`/aliases/delete/${id}`);
  return data;
}
