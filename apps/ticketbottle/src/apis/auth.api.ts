import { TokenData } from '@/features/Auth/interface/token.interface';
import axiosClient, { ApiResponse } from './axiosClient';

const authAPI = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiResponse<TokenData>> => {
    return await axiosClient.post('/auth/login', { email, password });
  },
  getMe: async () => {
    return await axiosClient.post('/auth/me');
  },
  refreshToken: async (
    refreshToken: string
  ): Promise<ApiResponse<Pick<TokenData, 'accessToken'>>> => {
    return await axiosClient.post('/auth/refresh-token', {
      refreshToken,
    });
  },
};

export default authAPI;
