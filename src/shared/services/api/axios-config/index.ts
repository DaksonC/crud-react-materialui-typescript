import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptor';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE,
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { api };