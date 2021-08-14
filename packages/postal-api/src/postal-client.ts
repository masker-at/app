import axios, { AxiosInstance } from 'axios';

export default function createPostalClient(baseURL: string, apiKey: string): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      'X-Server-API-Key': apiKey,
    },
  });
}
