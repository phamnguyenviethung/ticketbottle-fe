import { Event } from '@/features/Event/interfaces/event.interface';
import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { CalendarDays, MapPin } from 'lucide-react';
import BuyButton from './BuyButton';

const EventDetailInfoSection: React.FC<{ event: Event | null }> = ({
  event,
}) => {
  if (!event) return null;

  return (
    <Stack
      flex="1"
      w="full"
      bgColor="white"
      px={{
        base: 4,
        lg: 8,
      }}
      py={8}
      borderRadius="lg"
      justifyContent="space-between"
      border={{
        base: '1px solid',
        lg: 'none',
      }}
      borderColor="gray.200"
    >
      <Stack gap="6" minH="300px">
        <Heading as="h2" fontSize="2xl" letterSpacing="0.5px" fontWeight={700}>
          {event.eventInfo.name}
        </Heading>
        <HStack gap="4">
          <CalendarDays />
          <Stack gap="0">
            <Text
              fontSize={{
                base: 'md',
                md: 'lg',
              }}
              fontWeight="500"
            >
              {dayjs(event.eventInfo.startDate).format('DD/MM/YYYY')}
            </Text>
            <Text
              fontSize={{
                base: 'sm',
                md: 'md',
              }}
              fontWeight="500"
              color="gray.500"
            >
              Từ {dayjs(event.eventInfo.startDate).format('HH:mm')}
            </Text>
          </Stack>
        </HStack>
        <HStack gap="4">
          <MapPin />
          <Text
            fontSize={{
              base: 'md',
              md: 'lg',
            }}
            fontWeight="500"
          >
            {event.eventInfo.location}
          </Text>
        </HStack>
      </Stack>
      <Box>
        <BuyButton event={event} />
      </Box>
    </Stack>
  );
};

export default EventDetailInfoSection;
