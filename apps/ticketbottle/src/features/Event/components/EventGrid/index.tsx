import {
  Box,
  Center,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Tag,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { Event, EventInfo } from '../../interfaces/event.interface';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';

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
      gap={4}
    >
      {data.map((event: Event) => {
        const date = dayjs(event.eventInfo.startDate);
        const info: EventInfo = event.eventInfo;
        return (
          <Link
            key={event.id}
            to="/event/$eventID"
            params={{ eventID: event.id }}
          >
            <Stack minH="350px" w="full" p={2}>
              <Center w="full">
                <Image
                  src={event.eventInfo.thumbnail}
                  alt={event.eventInfo.name}
                  borderRadius="lg"
                />
              </Center>
              <Stack flex="1" mt={4}>
                <Stack gap="2">
                  <Box>
                    <Tag.Root
                      borderRadius="lg"
                      variant="subtle"
                      colorPalette="pink"
                      size="lg"
                    >
                      <Tag.Label>Show sẽ huỷ</Tag.Label>
                    </Tag.Root>
                  </Box>
                  <Text color="gray.600" fontWeight="500" fontSize="sm">
                    {date.date()} tháng {date.month() + 1}, {date.year()}
                  </Text>
                </Stack>
                <Flex alignItems="flex-end" flex="1">
                  <Heading
                    as="h1"
                    fontWeight={600}
                    fontSize={{
                      base: 'md',
                      md: 'lg',
                    }}
                  >
                    {info.name}
                  </Heading>
                </Flex>
              </Stack>
            </Stack>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

export default EventGrid;
