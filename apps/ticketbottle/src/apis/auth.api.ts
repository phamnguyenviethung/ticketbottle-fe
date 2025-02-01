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
};

export default authAPI;
