import authAPI from '@/apis/auth.api';
import AppInput from '@/components/AppInput';
import { toaster } from '@/components/ui/toaster';
import useAppStore from '@/store/useStore';
import { Box, Button, Center } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/_layout/_auth-layout/auth/login')({
  component: RouteComponent,
});

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty("Password can't be empty"),
});

function RouteComponent() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const nav = useNavigate();

  const store = useAppStore();

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
  });

  const onSubmit = form.handleSubmit(async (data: LoginFormValues) => {
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
  });

  return (
    <>
      <FormProvider {...form}>
        <Center boxSize="full">
          <Box
            as="form"
            w={{
              base: 'full',
              md: '50%',
              lg: '30%',
            }}
            onSubmit={onSubmit}
          >
            <AppInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <AppInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <Button
              loading={loginMutation.isPending}
              mt={2}
              w="full"
              type="submit"
            >
              Login
            </Button>
          </Box>
        </Center>
      </FormProvider>
    </>
  );
}
