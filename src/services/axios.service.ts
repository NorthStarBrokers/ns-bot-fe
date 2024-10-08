import axios, { AxiosHeaders } from 'axios';

axios.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const headers = new AxiosHeaders();
      config.headers = headers;
    }

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    config.baseURL = isLocal ? 'http://localhost:3000' : import.meta.env.VITE_API_URL;
    // config.baseURL = import.meta.env.VITE_API_URL;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
