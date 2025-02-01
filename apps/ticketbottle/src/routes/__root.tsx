import { Toaster } from '@/components/ui/toaster';
import useAuth from '@/features/Auth/hooks/useAuth';
import { getTokenFromLocalStorage } from '@/utils/authUtil';
import { Center } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import SyncLoader from 'react-spinners/SyncLoader';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
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
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}
