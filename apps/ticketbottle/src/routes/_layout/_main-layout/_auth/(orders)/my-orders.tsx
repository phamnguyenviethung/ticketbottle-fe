import orderAPI from '@/apis/order.api';
import useAppStore from '@/store/useStore';
import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router';
export const Route = createFileRoute(
  '/_layout/_main-layout/_auth/(orders)/my-orders'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const store = useAppStore();
  const { isLoading, data } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderAPI.getMyOrders,
    enabled: !!store.token,
    select: (res) => res.data,
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return (
    <Box>
      {data.data.map((i: { id: string }) => {
        return (
          <RouterLink to={`/order/$code`} params={{ code: i.id }} key={i.id}>
            <Text _hover={{ color: 'blue.500' }}>Đơn hàng {i.id}</Text>
          </RouterLink>
        );
      })}
    </Box>
  );
}
