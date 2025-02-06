import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Event, EventInfo } from '../../interfaces/event.interface';

interface EventGridProps {
  data: Event[] | [];
  isLoading?: boolean;
}

const LoadingEventGrid: React.FC = () => {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
        lg: 4,
      }}
      gap={4}
      w="full"
      my={4}
    >
      {[...Array(8)].map(() => {
        return (
          <Stack gap="4">
            <Skeleton height="200px" />
            <SkeletonText noOfLines={2} />
            <SkeletonText noOfLines={1} mt={6} w="full" />
          </Stack>
        );
      })}
    </SimpleGrid>
  );
};

const EventGrid: React.FC<EventGridProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <LoadingEventGrid />;
  }

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
        const info: EventInfo = event.eventInfo;
        if (!info) return null;
        const date = dayjs(info.startDate);

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
                  transition={'transform 0.05s linear'}
                  _hover={{
                    transform: {
                      base: 'scale(1)',
                      lg: 'scale(1.1)',
                    },
                    transition: 'transform 0.05s linear',
                  }}
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
