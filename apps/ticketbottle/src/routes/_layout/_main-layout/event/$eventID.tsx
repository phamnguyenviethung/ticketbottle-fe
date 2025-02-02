import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_main-layout/event/$eventID')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/_main-layout/event/$eventID"!</div>;
}
