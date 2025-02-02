import LoginForm from '@/features/Auth/components/LoginForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_auth-layout/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <LoginForm />
    </>
  );
}
