import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/_main-layout/')({
  component: Index,
});

function Index() {
  return <div>hasdsi</div>;
}
