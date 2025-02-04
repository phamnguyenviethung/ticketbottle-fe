import { PaymentGateway } from '@/features/Order/interfaces/order.interface';
import axiosClient from './axiosClient';

export interface PlaceOrderRequestBody {
  eventId: string;
  returnUrl: string;
  paymentGateway: PaymentGateway;
  orderDetails: {
    ticketClassId: string;
    quantity: number;
  }[];
}

const orderAPI = {
  placeOrder: async (body: PlaceOrderRequestBody) => {
    return await axiosClient.post('/order', body);
  },

  getMyOrders: async () => {
    return await axiosClient.get('/order/my-orders');
  },

  getOrderDetail: async (orderCode: string) => {
    return await axiosClient.get(`/order/${orderCode}`);
  },
};

export default orderAPI;
