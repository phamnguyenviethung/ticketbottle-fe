import orderAPI from '@/apis/order.api';
import PageLoader from '@/components/Loader/PageLoader';
import { Box, Center, Heading, QrCode, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
export const Route = createFileRoute(
  '/_layout/_main-layout/(orders)/order/$code'
)({
  component: RouteComponent,
});

interface DataTitle {
  label: string;
  value: string | number;
}

const DataTitle: React.FC<DataTitle> = (props) => {
  return (
    <Box
      direction="row"
      display="flex"
      justifyContent="space-between"
      w="full"
      my="2"
    >
      <Text
        fontSize={{
          base: 'sm',
          md: 'md',
        }}
      >
        {props.label}
      </Text>
      <Text
        fontWeight={500}
        textAlign="right"
        fontSize={{
          base: 'md',
          md: 'lg',
        }}
      >
        {props.value}
      </Text>
    </Box>
  );
};

function RouteComponent() {
  const { code } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['order', code],
    queryFn: () => orderAPI.getOrderDetail(code),
    enabled: !!code,
    select: (res) => res.data,
  });

  if (isLoading) return <PageLoader />;

  const orderData: DataTitle[] = [
    {
      label: 'Họ và Tên',
      value: data.firstName + ' ' + data.lastName,
    },
    {
      label: 'Email',
      value: data.email,
    },
    {
      label: 'Mã đơn hàng',
      value: data.code,
    },
    {
      label: 'Mã giao dịch',
      value: data.transactionId,
    },
    {
      label: 'Ngày tạo',
      value: dayjs(data.createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      label: 'Tổng tiền',
      value: data.totalCheckOut,
    },
    {
      label: 'Trạng Thái',
      value: data.status,
    },
  ];

  return (
    <Stack w="full" gap={8}>
      <Box w="full">
        <Heading as="h6">Thông tin đơn hàng</Heading>
        <Stack
          w="full"
          border="2px solid"
          borderColor="green"
          p="4"
          borderRadius="md"
        >
          {orderData.map((i: DataTitle) => {
            return <DataTitle {...i} key={i.label} />;
          })}
        </Stack>
      </Box>
      <Box w="full">
        <Heading as="h6">Thông tin vé</Heading>
        <Stack w="full">
          {data.orderDetails.map(
            (i: {
              ticketclass: { name: string; price: string };
              quantity: number;
              tickets: { serialNumber: string }[];
            }) => {
              return (
                <Stack
                  key={i.ticketclass.name}
                  w="full"
                  border="2px dashed"
                  p="4"
                  borderRadius="lg"
                >
                  <DataTitle label="Tên vé" value={i.ticketclass.name} />
                  <DataTitle label="Số lượng" value={i.quantity} />
                  <DataTitle label="Giá vé" value={i.ticketclass.price} />
                  <Box>
                    <Stack gap={24}>
                      {i.tickets.map((ticket: { serialNumber: string }) => {
                        return (
                          <Center
                            flexDirection="column"
                            gap={4}
                            w="full"
                            key={ticket.serialNumber}
                          >
                            <QrCode.Root value={ticket.serialNumber} size="xl">
                              <QrCode.Frame>
                                <QrCode.Pattern />
                              </QrCode.Frame>
                            </QrCode.Root>
                            <Text fontWeight={600}>{ticket.serialNumber}</Text>
                          </Center>
                        );
                      })}
                    </Stack>
                  </Box>
                </Stack>
              );
            }
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
