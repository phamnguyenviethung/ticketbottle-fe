import authAPI from '@/apis/auth.api';
import useAppStore from '@/store/useStore';
import {
  clearAuthLocalStorage,
  saveUserInfoToLocalStorage,
} from '@/utils/authUtil';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { User } from '@/features/Auth/interface/user.interface';
import { TokenData } from '../interface/token.interface';

interface UseAuthInterface {
  query: UseQueryResult<User, Error>;
  user: User | null;
  logout: () => void;
  token: TokenData | null;
}

const useAuth = (): UseAuthInterface => {
  const setUser = useAppStore((state) => state.setUser);
  const setToken = useAppStore((state) => state.setToken);
  const user = useAppStore((state) => state.user);
  const token = useAppStore((state) => state.token);
  const query = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getMe,
    select: (res) => {
      return res.data;
    },
    enabled: !!token,
  });

  const logout = (): void => {
    clearAuthLocalStorage();
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
      saveUserInfoToLocalStorage(query.data);
    }
  }, [query.data, setUser]);

  return {
    token,
    query,
    user,
    logout,
  };
};

export default useAuth;
