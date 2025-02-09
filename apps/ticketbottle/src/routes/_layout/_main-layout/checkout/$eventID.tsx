import eventAPI from '@/apis/event.api';
import orderAPI, { PlaceOrderRequestBody } from '@/apis/order.api';
import PageLoader from '@/components/Loader/PageLoader';
import { TicketClass } from '@/features/Event/interfaces/ticket.interface';
import { PaymentGateway } from '@/features/Order/interfaces/order.interface';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import _ from 'lodash';
import { useState } from 'react';
export const Route = createFileRoute('/_layout/_main-layout/checkout/$eventID')(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  const [ticketQuantity, setTicketQuantity] = useState(
    new Map<
      string,
      {
        quantity: number;
        name: string;
        price: number;
        id: string;
      }
    >()
  );
  const { eventID } = Route.useParams();

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

  const checkoutMutation = useMutation({
    mutationFn: () => {
      const data: PlaceOrderRequestBody = {
        paymentGateway: PaymentGateway.ZALOPAY,
        eventId: eventID,
        returnUrl: window.location.origin + '/my-orders',
        orderDetails: Array.from(ticketQuantity)
          .filter((m) => m[1].quantity > 0)
          .map((m) => {
            const item = m[1];
            return {
              ticketClassId: item.id,
              quantity: item.quantity,
            };
          }),
      };
      return orderAPI.placeOrder(data);
    },
  });

  const handleCheckout = async () => {
    try {
      const res = await checkoutMutation.mutateAsync();
      window.location.href = res.data.paymentUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = (tc: TicketClass, plus: number) => {
    const currentQuantity = ticketQuantity.get(tc.id);
    if (_.isEmpty(currentQuantity)) {
      ticketQuantity.set(tc.id, {
        quantity: 1,
        name: tc.name,
        price: tc.price,
        id: tc.id,
      });
    } else {
      ticketQuantity.set(tc.id, {
        name: tc.name,
        price: tc.price,
        id: tc.id,
        quantity: currentQuantity.quantity + plus,
      });
    }

    setTicketQuantity(new Map(ticketQuantity));
  };

  const calcTotal = () => {
    return Array.from(ticketQuantity).reduce(
      (acc, m) => acc + m[1].price * m[1].quantity,
      0
    );
  };

  if (event.isLoading || ticketClass.isLoading) {
    return <PageLoader />;
  }

  return (
    <Stack
      direction={{
        base: 'column',
        md: 'row',
      }}
      w="full"
      gapY={8}
    >
      <Box
        w="full"
        display={{
          base: 'block',
          md: 'none',
        }}
      >
        <Image src={event.data?.eventInfo.thumbnail} borderRadius="lg" />
      </Box>
      <Stack
        gap={4}
        flex="3"
        w="full"
        border="0.5px solid"
        borderColor="gray.200"
        p={4}
        borderRadius="lg"
      >
        {ticketClass.data?.map((c) => {
          return (
            <Stack direction="row" key={c.id} w="full" alignItems="center">
              <Box w="full" flex="2">
                <Stack w="full" flex="2">
                  <Text
                    color="gray.500"
                    fontWeight={800}
                    fontSize="xl"
                    letterSpacing="0.5px"
                  >
                    {c.name}
                  </Text>
                  <Text
                    display={{
                      base: 'block',
                      md: 'none',
                    }}
                    fontSize={{
                      base: 'md',
                      md: 'lg',
                    }}
                    fontWeight={700}
                  >
                    {c.price}
                  </Text>
                </Stack>
              </Box>
              <Box
                w="full"
                textAlign="center"
                flex="1"
                display={{
                  base: 'none',
                  md: 'block',
                }}
              >
                <Box w="full">
                  <Text
                    fontSize={{
                      base: 'md',
                      md: 'lg',
                    }}
                    fontWeight={700}
                  >
                    {c.price}
                  </Text>
                </Box>
              </Box>
              <Box w="full" flex="2">
                <Center gap="6" alignItems="center" direction="row" w="full">
                  <Button
                    colorPalette="green"
                    variant="subtle"
                    onClick={() => handleQuantity(c, -1)}
                    disabled={!ticketQuantity.get(c.id)?.quantity}
                  >
                    -
                  </Button>
                  <Text fontWeight={500} fontSize="lg">
                    {ticketQuantity.get(c.id)?.quantity || 0}
                  </Text>
                  <Button
                    colorPalette="green"
                    variant="subtle"
                    onClick={() => handleQuantity(c, 1)}
                  >
                    +
                  </Button>
                </Center>
              </Box>
            </Stack>
          );
        })}
      </Stack>
      <Box flex="1" p={4}>
        <Stack>
          <Box
            w="full"
            display={{
              base: 'none',
              md: 'block',
            }}
          >
            <Image src={event.data?.eventInfo.thumbnail} borderRadius="lg" />
          </Box>
          {Array.from(ticketQuantity).map((m) => {
            const item = m[1];
            if (item.quantity === 0) return null;
            return (
              <Stack
                key={item.id}
                direction="row"
                w="full"
                alignItems="center"
                justifyContent="space-between"
                py={2}
              >
                <Box>
                  <Text fontWeight={600} fontSize="xl">
                    {item.name}
                  </Text>
                  <Text color="gray.500" fontWeight={600} fontSize="md">
                    Số lượng: {item.quantity}
                  </Text>
                </Box>
                <Box>
                  <Text> {item.price}</Text>
                </Box>
              </Stack>
            );
          })}
          <Stack gap={4} mt={20}>
            <Flex justifyContent="space-between">
              <Text fontWeight={600} fontSize="xl">
                Tổng tiền
              </Text>
              <Text color="red.600" fontWeight={800} fontSize="lg">
                {calcTotal()}
              </Text>
            </Flex>
            <Button
              size="xl"
              colorPalette="green"
              disabled={!calcTotal()}
              onClick={handleCheckout}
              loading={checkoutMutation.isPending}
            >
              Thanh toán
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
