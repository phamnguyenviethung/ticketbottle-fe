import EventGrid from '@/features/Event/components/EventGrid';
import BigEventCoverSlider from '@/features/Event/components/EventSlider/BigEventCoverSlider';
import useEventList from '@/features/Event/hooks/useEventList';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/_main-layout/')({
  component: Index,
});

function Index() {
  const { query } = useEventList({ apiParams: { perPage: 10 } });
  if (query.isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!query.data) {
    throw new Error('Data is not available');
  }
  return (
    <Stack gap={16} w="full">
      <BigEventCoverSlider data={query.data.data} />
      <Box>
        <Heading as="h6">Sự kiện</Heading>
        <EventGrid data={query.data.data} />
      </Box>
    </Stack>
  );
}
