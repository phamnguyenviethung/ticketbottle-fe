import authCheckBeforeLoad from '@/features/Auth/authCheckBeforeLoad';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute(
  '/_layout/_main-layout/(orders)/my-orders'
)({
  component: RouteComponent,
  beforeLoad: authCheckBeforeLoad,
});

function RouteComponent() {
  return <div>Hello "/_layout/_main-layout/(orders)/my-orders"!</div>;
}
