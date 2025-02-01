import { getTokenFromLocalStorage } from '@/utils/authUtil';
import axios, { AxiosInstance } from 'axios';

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token.accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
