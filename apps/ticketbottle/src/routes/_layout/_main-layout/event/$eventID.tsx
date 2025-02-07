import eventAPI from '@/apis/event.api';
import orderAPI, { PlaceOrderRequestBody } from '@/apis/order.api';
import { TicketClass } from '@/features/Event/interfaces/ticket.interface';
import { PaymentGateway } from '@/features/Order/interfaces/order.interface';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import _ from 'lodash';
import { useState } from 'react';
import dayjs from 'dayjs';
import { CalendarDays, MapPin } from 'lucide-react';
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
          p={[4, 8]}
          borderRadius="lg"
          justifyContent="space-between"
        >
          <Stack gap="6" minH="200px">
            <Heading
              as="h2"
              fontSize="2xl"
              letterSpacing="0.5px"
              fontWeight={700}
            >
              {event.data?.eventInfo.name}
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
                  {dayjs(event.data?.eventInfo.startDate).format('DD/MM/YYYY')}
                </Text>
                <Text
                  fontSize={{
                    base: 'sm',
                    md: 'md',
                  }}
                  fontWeight="500"
                  color="gray.500"
                >
                  Từ {dayjs(event.data?.eventInfo.startDate).format('HH:mm')}
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
                {event.data?.eventInfo.location}
              </Text>
            </HStack>
          </Stack>
          <Box>
            <Button colorPalette="green" w="full" size="2xl">
              Mua vé ngay - Từ 290.000 VNĐ
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Container my={4} minH="200px">
        <Box>
          <Heading
            as="h6"
            fontSize={{
              base: 'xl',
              md: '2xl',
            }}
          >
            Giới thiệu
          </Heading>
          <Box>{event.data?.eventInfo.description}</Box>
        </Box>
      </Container>
    </Box>
  );
}
