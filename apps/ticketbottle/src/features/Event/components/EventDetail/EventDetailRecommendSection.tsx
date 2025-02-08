import eventAPI from '@/apis/event.api';
import { Box, Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import EventGrid from '../EventGrid';

const EventDetailRecommendSection: React.FC<{ eventId: string }> = ({
  eventId,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['eventDetailRecommend', eventId],
    queryFn: () => {
      return eventAPI.getRecommendEventList({ eventId, limit: 8 });
    },
    enabled: !!eventId,
    select: (res) => res.data,
  });

  return (
    <Box>
      <Heading as="h6" mb={4}>
        Có thể bạn quan tâm
      </Heading>
      <EventGrid data={data ?? []} isLoading={isLoading} />
    </Box>
  );
};

export default EventDetailRecommendSection;
