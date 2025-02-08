import { Box, Container, Heading, Image, Stack } from '@chakra-ui/react';
import { Event } from '../../interfaces/event.interface';

const EventDetailBody: React.FC<{ event: Event | null }> = ({ event }) => {
  if (!event) return null;
  return (
    <Container>
      <Stack direction="row">
        <Box flex="3">
          <Heading
            as="h6"
            fontSize={{
              base: 'xl',
              md: '2xl',
            }}
          >
            Giới thiệu
          </Heading>
          <Box>{event.eventInfo.description}</Box>
        </Box>

        <Box flex="1" h="full" display={{ base: 'none', lg: 'block' }}>
          <Image borderRadius="lg" src="https://placehold.co/400x500" />
        </Box>
      </Stack>
    </Container>
  );
};

export default EventDetailBody;
