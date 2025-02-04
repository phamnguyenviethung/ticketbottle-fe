import useAppStore from '@/store/useStore';
import { createFileRoute, redirect } from '@tanstack/react-router';
import _ from 'lodash';
export const Route = createFileRoute(
  '/_layout/_main-layout/(orders)/my-orders'
)({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const token = useAppStore.getState().token;
    if (_.isEmpty(token)) {
      throw redirect({
        to: '/auth/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/_layout/_main-layout/(orders)/my-orders"!</div>;
}
