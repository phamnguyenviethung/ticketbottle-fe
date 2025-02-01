import authAPI from '@/apis/auth.api';
import useAppStore from '@/store/useStore';
import { saveUserInfoToLocalStorage } from '@/utils/authUtil';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useAuth = () => {
  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);
  const query = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getMe,
    select: (res) => {
      return res.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
      saveUserInfoToLocalStorage(query.data);
    }
  }, [query.data, setUser]);

  return {
    query,
    user,
  };
};

export default useAuth;
