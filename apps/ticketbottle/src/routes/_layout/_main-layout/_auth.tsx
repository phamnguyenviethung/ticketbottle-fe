import authCheckBeforeLoad from '@/features/Auth/authCheckBeforeLoad';
import useAuth from '@/features/Auth/hooks/useAuth';
import { getTokenFromLocalStorage } from '@/utils/authUtil';
import { Center } from '@chakra-ui/react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import SyncLoader from 'react-spinners/SyncLoader';

export const Route = createFileRoute('/_layout/_main-layout/_auth')({
  component: RouteComponent,
  beforeLoad: authCheckBeforeLoad,
});

function RouteComponent() {
  const { query } = useAuth();
  if (query.isLoading && getTokenFromLocalStorage()) {
    return (
      <Center h="100vh" w="full">
        <SyncLoader />
      </Center>
    );
  }
  return (
    <>
      <Outlet />
    </>
  );
}
