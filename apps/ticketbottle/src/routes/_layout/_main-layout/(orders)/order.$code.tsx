import orderAPI from '@/apis/order.api';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { DataList } from '@chakra-ui/react';

export const Route = createFileRoute(
  '/_layout/_main-layout/(orders)/order/$code'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { code } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['order', code],
    queryFn: () => orderAPI.getOrderDetail(code),
    enabled: !!code,
    select: (res) => res.data,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box>
      <DataList.Root>
        {Object.keys(data).map((k: string) => {
          return (
            <DataList.Item key={k}>
              <DataList.ItemLabel>{k}</DataList.ItemLabel>
              <DataList.ItemValue>{data[k]}</DataList.ItemValue>
            </DataList.Item>
          );
        })}
      </DataList.Root>
    </Box>
  );
}
