import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Event, EventInfo } from '../../interfaces/event.interface';
import { Link } from '@tanstack/react-router';

interface EventGridProps {
  data: Event[] | [];
}

const EventGrid: React.FC<EventGridProps> = ({ data }) => {
  return (
    <SimpleGrid
      my={2}
      columns={{
        base: 1,
        md: 2,
        lg: 4,
      }}
      w="full"
    >
      {data.map((event: Event) => {
        const info: EventInfo = event.eventInfo;
        return (
          <Link
            key={event.id}
            to="/event/$eventID"
            params={{ eventID: event.id }}
          >
            <Box p={2}>
              <Image src={'https://placehold.co/400x300'} />
              <Text>{info.name}</Text>
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

export default EventGrid;
