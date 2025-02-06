import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { SimpleGrid, Stack } from '@chakra-ui/react';

const EventGridLoading: React.FC = () => {
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
      {[...Array(8)].map((i: number) => {
        return (
          <Stack gap="4" key={i}>
            <Skeleton height="200px" />
            <SkeletonText noOfLines={2} />
            <SkeletonText noOfLines={1} mt={6} w="full" />
          </Stack>
        );
      })}
    </SimpleGrid>
  );
};

export default EventGridLoading;
