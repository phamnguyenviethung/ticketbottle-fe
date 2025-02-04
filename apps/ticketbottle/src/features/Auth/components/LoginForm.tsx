import { Box, Button, Center } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import useLogin from '../hooks/useLogin';
import AppInput from '@/components/AppInput';

export interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty("Password can't be empty"),
});

const LoginForm: React.FC<{ redirect: string }> = ({ redirect }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { handleLogin, loginMutation } = useLogin({ redirect });
  const onSubmit = form.handleSubmit(handleLogin);

  return (
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
  );
};

export default LoginForm;
