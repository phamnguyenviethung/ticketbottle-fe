import authAPI from '@/apis/auth.api';
import useAppStore from '@/store/useStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { LoginFormValues } from '../components/LoginForm';
import { toaster } from '@/shared/components/ui/toaster';

const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
  });

  const nav = useNavigate();

  const store = useAppStore();

  async function handleLogin(data: LoginFormValues) {
    try {
      const res = await loginMutation.mutateAsync(data);
      localStorage.setItem('token', JSON.stringify(res.data));
      store.setToken(res.data);
      nav({ to: '/' });
    } catch (error: any) {
      console.log(error);
      toaster.create({
        type: 'error',
        title: error.message.toString(),
      });
    }
  }

  return {
    loginMutation,
    handleLogin,
  };
};

export default useLogin;
