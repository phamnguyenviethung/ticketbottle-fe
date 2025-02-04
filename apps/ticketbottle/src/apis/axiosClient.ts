import useAppStore from '@/store/useStore';
import { getTokenFromLocalStorage } from '@/utils/authUtil';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import authAPI from './auth.api';

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface ApiErrorResponse {
  data: {
    message: string;
    statusCode: number;
    error?: string | object | null | undefined;
  };
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
  async function (response: AxiosResponse) {
    if (response.status === 401) {
      const token = useAppStore.getState().token;
      const refreshToken = token?.refreshToken;
      if (refreshToken) {
        try {
          const res = await authAPI.refreshToken(refreshToken);
          useAppStore
            .getState()
            .setToken({ accessToken: res.data.accessToken, refreshToken });
        } catch (refreshTokenError) {
          useAppStore.getState().logout();
          return Promise.reject(refreshTokenError);
        }
      }
    }
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error: AxiosError) {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
