import eventAPI from '@/apis/event.api';
import orderAPI, { PlaceOrderRequestBody } from '@/apis/order.api';
import { TicketClass } from '@/features/Event/interfaces/ticket.interface';
import { PaymentGateway } from '@/features/Order/interfaces/order.interface';
import { Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import _ from 'lodash';
import { useState } from 'react';
import dayjs from 'dayjs';
export const Route = createFileRoute('/_layout/_main-layout/event/$eventID')({
  component: RouteComponent,
});

function RouteComponent() {
  const { eventID } = Route.useParams();

  const [selectedTicketClass, setSelectedTicketClass] = useState<
    Record<string, number>
  >({});

  const placeOrderMutaion = useMutation({
    mutationFn: (body: PlaceOrderRequestBody) => orderAPI.placeOrder(body),

    onSuccess: (res) => {
      const link = res.data.paymentUrl.url;
      window.open(link, '_blank');
    },
  });

  const handleClickBuy = () => {
    const orderDetails = Object.keys(selectedTicketClass).map((key) => ({
      ticketClassId: key,
      quantity: selectedTicketClass[key],
    }));

    placeOrderMutaion.mutate({
      paymentGateway: PaymentGateway.ZALOPAY,
      eventId: eventID,
      returnUrl: window.location.origin + '/my-orders',
      orderDetails,
    });
  };

  const event = useQuery({
    queryKey: ['event', eventID],
    queryFn: () => eventAPI.getEventByID(eventID),
    enabled: !!eventID,
    select: (res) => res.data,
  });

  const ticketClass = useQuery({
    queryKey: ['ticketClass', eventID],
    queryFn: () => eventAPI.getTicketClassByEventID(eventID),
    enabled: !!eventID,
    select: (res) => res.data,
  });

  if (event.isLoading || ticketClass.isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box w="full">
      <Stack
        p={8}
        bgGradient="to-tr"
        gradientFrom="gray.800"
        gradientTo="blackAlpha.900"
        w="full"
        direction={{
          base: 'column',
          md: 'row',
        }}
      >
        <Box w="full" flex="3">
          <Image
            borderRadius="lg"
            w="full"
            h="full"
            src={event.isSuccess ? event.data.eventInfo.thumbnail : ''}
          />
        </Box>
        <Stack
          w="full"
          flex="1"
          bgColor="white"
          p={[8, 12, 14]}
          borderRadius="lg"
          justifyContent="space-between"
        >
          <Stack>
            <Heading
              as="h2"
              fontSize="xl"
              letterSpacing="0.5px"
              fontWeight={700}
            >
              {event.data?.eventInfo.name}
            </Heading>
            <Stack>
              <Text fontSize="lg" fontWeight="500">
                {dayjs(event.data?.eventInfo.startDate).format('DD/MM/YYYY')}
              </Text>
            </Stack>
            <Text fontSize="lg" fontWeight="500">
              {event.data?.eventInfo.location}
            </Text>
          </Stack>
          <Box>
            <Button colorPalette="green" w="full" size="2xl">
              Mua vé ngay - Từ 290.000 VNĐ
            </Button>
          </Box>
        </Stack>
      </Stack>
      EventID: {event.data?.id}
      {ticketClass.data?.map((ticket: TicketClass) => {
        return (
          <Box key={ticket.id}>
            <Text>
              {ticket.name} - {ticket.price} triệu
            </Text>
            <Button
              onClick={() => {
                const q = selectedTicketClass[ticket.id];

                const newQ = q ? q + 1 : 1;

                setSelectedTicketClass({
                  ...selectedTicketClass,
                  [ticket.id]: newQ,
                });
              }}
            >
              Chọn
            </Button>
          </Box>
        );
      })}
      <Button
        disabled={_.isEmpty(selectedTicketClass)}
        onClick={handleClickBuy}
      >
        Mua đê
      </Button>
      {Object.keys(selectedTicketClass).map((c) => {
        return (
          <Box key={c}>
            <Text>{ticketClass.data?.find((t) => t.id === c)?.name}</Text>
            <Text>{selectedTicketClass[c]}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
