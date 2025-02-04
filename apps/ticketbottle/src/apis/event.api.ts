import {
  Event,
  EventListResponse,
} from '@/features/Event/interfaces/event.interface';
import axiosClient, { ApiResponse } from './axiosClient';
import { TicketClass } from '@/features/Event/interfaces/ticket.interface';

export interface GetEventsOptions {
  page?: number;
  perPage?: number;
  includeInfo?: true;
}

const eventAPI = {
  getEvents: async (options?: GetEventsOptions): Promise<EventListResponse> => {
    return await axiosClient.get('/event', { params: options });
  },
  getEventByID: async (id: string): Promise<ApiResponse<Event>> => {
    return await axiosClient.get(`/event/${id}`);
  },

  getTicketClassByEventID: async (
    id: string
  ): Promise<ApiResponse<TicketClass[]>> => {
    return await axiosClient.get(`/event/${id}/ticket-classes`);
  },
};

export default eventAPI;
