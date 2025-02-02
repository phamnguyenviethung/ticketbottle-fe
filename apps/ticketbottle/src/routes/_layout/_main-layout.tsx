import MainLayout from '@/components/layouts/MainLayout';
import useAuth from '@/features/Auth/hooks/useAuth';
import { getTokenFromLocalStorage } from '@/utils/authUtil';
import { Center } from '@chakra-ui/react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import SyncLoader from 'react-spinners/SyncLoader';

export const Route = createFileRoute('/_layout/_main-layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const { query } = useAuth();
  if (query.isLoading && getTokenFromLocalStorage()) {
    return (
      <Center h="100vh" w="full">
        <SyncLoader  />
      </Center>
    );
  }
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
