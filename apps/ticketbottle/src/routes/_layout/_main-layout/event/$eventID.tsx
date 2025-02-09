import eventAPI from '@/apis/event.api';
import PageLoader from '@/components/Loader/PageLoader';
import EventDetailBody from '@/features/Event/components/EventDetail/EventDetailBody';
import EventDetailHeader from '@/features/Event/components/EventDetail/EventDetailHeader';
import EventDetailRecommendSection from '@/features/Event/components/EventDetail/EventDetailRecommendSection';
import { Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/_main-layout/event/$eventID')({
  component: RouteComponent,
});

function RouteComponent() {
  const { eventID } = Route.useParams();

  const event = useQuery({
    queryKey: ['event', eventID],
    queryFn: () => eventAPI.getEventByID(eventID),
    enabled: !!eventID,
    select: (res) => res.data,
  });



  if (event.isLoading) {
    return <PageLoader />;
  }

  if (event.isError || !event.data) {
    throw new Error();
  }

  return (
    <Stack w="full" gap={20}>
      <EventDetailHeader event={event.data} />
      <EventDetailBody event={event.data} />
      <EventDetailRecommendSection eventId={eventID} />
    </Stack>
  );
}
