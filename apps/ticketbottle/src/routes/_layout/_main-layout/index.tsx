import EventGrid from '@/features/Event/components/EventGrid';
import BigEventCoverSlider from '@/features/Event/components/EventSlider/BigEventCoverSlider';
import useEventList from '@/features/Event/hooks/useEventList';
import { Box, Heading, Show, Stack } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_main-layout/')({
  component: Index,
  errorComponent: () => <Box>Loading data error</Box>,
});

function Index() {
  const { query } = useEventList({ apiParams: { perPage: 10 } });

  if (!query.data && !query.isLoading) {
    throw new Error('Data is not available');
  }

  return (
    <Stack gap={16} w="full">
      <BigEventCoverSlider
        data={query.isSuccess ? query.data.data : []}
        isLoading={query.isLoading}
      />
      <Box>
        <Show when={query.isSuccess}>
          <Heading as="h6">Sự kiện</Heading>
        </Show>
        <EventGrid
          data={query.isSuccess ? query.data.data : []}
          isLoading={query.isLoading}
        />
      </Box>
    </Stack>
  );
}
