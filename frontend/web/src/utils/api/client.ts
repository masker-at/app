import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000',
  xsrfCookieName: 'ct',
  xsrfHeaderName: 'X-CSRF-Token',
  withCredentials: true,
});

export default apiClient;
