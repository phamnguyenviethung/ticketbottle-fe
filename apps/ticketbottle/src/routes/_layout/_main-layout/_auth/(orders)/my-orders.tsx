import orderAPI from '@/apis/order.api';
import PageLoader from '@/components/Loader/PageLoader';
import useAppStore from '@/store/useStore';
import {
  Badge,
  Box,
  Container,
  Table,
  TableScrollArea,
  Text,
} from '@chakra-ui/react';
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

  if (isLoading) return <PageLoader />;

  return (
    <Container maxW="container.lg">
      <TableScrollArea borderWidth="1px">
        <Table.Root
          size="lg"
          colorPalette="green"
          variant="outline"
          stickyHeader
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Tên sự kiện</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Thanh toán
              </Table.ColumnHeader>
              <Table.ColumnHeader>Trạng thái</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.data.map(
              (i: {
                id: string;
                totalCheckOut: number;
                status: string;
                event: { eventInfo: { name: string } };
              }) => {
                return (
                  <Table.Row key={i.id}>
                    <Table.Cell>
                      <Box
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                      >
                        <Text fontWeight={600}>{i.event.eventInfo.name}</Text>
                      </Box>
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      <Text>{i.totalCheckOut}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorPalette={
                          i.status === 'CANCELLED' ? 'red' : 'green'
                        }
                        variant="solid"
                      >
                        {i.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <RouterLink to="/order/$code" params={{ code: i.id }}>
                        <Text color="green.600" fontWeight={700}>
                          Xem chi tiết
                        </Text>
                      </RouterLink>
                    </Table.Cell>
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
        </Table.Root>
      </TableScrollArea>
    </Container>
  );
}
