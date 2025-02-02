import EventGrid from '@/features/Event/components/EventGrid';
import useEventList from '@/features/Event/hooks/useEventList';
import { Box } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/_main-layout/')({
  component: Index,
});

function Index() {
  const { query } = useEventList({ apiParams: { perPage: 10 } });
  if (query.isLoading) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box w="full">{query.data && <EventGrid data={query.data.data} />}</Box>
  );
}
