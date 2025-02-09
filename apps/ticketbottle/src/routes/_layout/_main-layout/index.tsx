import EventGridByCate from '@/features/Event/components/EventGrid/EventGridByCate';
import BigEventCoverSlider from '@/features/Event/components/EventSlider/BigEventCoverSlider';
import useEventList from '@/features/Event/hooks/useEventList';
import useEventListByCategory from '@/features/Event/hooks/useEventListByCategory';
import { Box, Stack } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_main-layout/')({
  component: Index,
  errorComponent: () => <Box>Loading data error</Box>,
});

function Index() {
  const { query } = useEventList({ apiParams: { perPage: 10 } });
  const { query: newQuery } = useEventListByCategory();

  if (query.isError || newQuery.isError) {
    throw new Error('Error loading data');
  }

  return (
    <Box>
      <Stack gap={16} w="full">
        <BigEventCoverSlider
          data={query.isSuccess ? query.data.data : []}
          isLoading={query.isLoading}
        />
        <EventGridByCate
          data={newQuery.isSuccess ? newQuery.data : []}
          isLoading={newQuery.isLoading}
        />
      </Stack>
    </Box>
  );
}
