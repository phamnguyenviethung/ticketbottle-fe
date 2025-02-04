import authAPI from '@/apis/auth.api';
import useAppStore from '@/store/useStore';
import createApiErrorToast from '@/utils/createApiErrorToast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { LoginFormValues } from '../components/LoginForm';

interface UseLoginProps {
  redirect: string;
}

const useLogin = ({ redirect }: UseLoginProps) => {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
  });

  const store = useAppStore();

  async function handleLogin(data: LoginFormValues) {
    try {
      const res = await loginMutation.mutateAsync(data);
      localStorage.setItem('token', JSON.stringify(res.data));
      store.setToken(res.data);
      router.history.push(redirect);
    } catch (error: unknown) {
      console.log(error);
      createApiErrorToast(error);
    }
  }

  return {
    loginMutation,
    handleLogin,
  };
};

export default useLogin;
