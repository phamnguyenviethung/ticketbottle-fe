import { Toaster } from '@/components/ui/toaster';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: Root,
  errorComponent: () => <div>Error</div>,
});

function Root() {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}
