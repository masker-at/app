import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? process.env.API_PRIVATE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        'http://localhost:3000'
      : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  xsrfCookieName: 'ct',
  xsrfHeaderName: 'X-CSRF-Token',
  withCredentials: true,
});

export default apiClient;
