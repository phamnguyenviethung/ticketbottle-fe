import authAPI from '@/apis/auth.api';
import useAppStore from '@/store/useStore';
import {
  clearAuthLocalStorage,
  saveUserInfoToLocalStorage,
} from '@/utils/authUtil';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { User } from '@/features/Auth/interface/user.interface';

interface UseAuthInterface {
  query: UseQueryResult<User, Error>;
  user: User | null;
  logout: () => void;
}

const useAuth = (): UseAuthInterface => {
  const setUser = useAppStore((state) => state.setUser);
  const setToken = useAppStore((state) => state.setToken);
  const user = useAppStore((state) => state.user);
  const query = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getMe,
    select: (res) => {
      return res.data;
    },
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
    query,
    user,
    logout,
  };
};

export default useAuth;
