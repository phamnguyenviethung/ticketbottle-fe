import EventDetailInfoSection from '@/features/Event/components/EventDetail/EventDetailInfoSection';
import { Image, Stack } from '@chakra-ui/react';
import { Event } from '../../interfaces/event.interface';
const EventDetailHeader: React.FC<{ event: Event | null }> = ({ event }) => {
  if (!event) return null;
  return (
    <Stack
      borderRadius="md"
      p={{
        base: 0,
        lg: 4,
        xl: 20,
      }}
      bgGradient="to-tr"
      gradientFrom={{
        base: 'white',
        lg: 'gray.800',
      }}
      gradientTo={{
        base: 'white',
        lg: 'blackAlpha.900',
      }}
      w="full"
      direction={{
        base: 'column',
        lg: 'row',
      }}
      minH="600px"
      gapY={20}
      alignItems="center"
    >
      <Image
        borderRadius="lg"
        w="full"
        h="full"
        src={event.eventInfo.thumbnail}
        objectFit="contain"
      />
      <EventDetailInfoSection event={event} />
    </Stack>
  );
};

export default EventDetailHeader;
