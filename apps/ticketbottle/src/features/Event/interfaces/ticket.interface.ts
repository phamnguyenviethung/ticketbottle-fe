export interface TicketClass {
  id: string;
  eventId: string;
  name: string;
  description: string;
  status: string;
  price: number;
  totalQuantity: number;
  soldQuantity: number;
}
