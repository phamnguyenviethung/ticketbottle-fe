import {
  Event,
  EventListByCategory,
  EventListResponse,
} from '@/features/Event/interfaces/event.interface';
import axiosClient, { ApiResponse } from './axiosClient';
import { TicketClass } from '@/features/Event/interfaces/ticket.interface';

export interface GetEventsOptions {
  page?: number;
  perPage?: number;
}

export enum ReccomendEventTime {
  // eslint-disable-next-line no-unused-vars
  THIS_WEEK = 'this_week',
  // eslint-disable-next-line no-unused-vars
  THIS_MONTH = 'this_month',
}

export interface GetRecommendEventListOptions {
  limit?: number;
  eventId?: string;
  at?: ReccomendEventTime;
}

const eventAPI = {
  getEvents: async (options?: GetEventsOptions): Promise<EventListResponse> => {
    return await axiosClient.get('/event', { params: options });
  },
  getEventByID: async (id: string): Promise<ApiResponse<Event>> => {
    return await axiosClient.get(`/event/${id}`);
  },

  getEventsListByCategory: async (): Promise<
    ApiResponse<EventListByCategory[]>
  > => {
    return await axiosClient.get(`/event/categories`);
  },

  getRecommendEventList: async (
    opt: GetRecommendEventListOptions
  ): Promise<ApiResponse<Event[]>> => {
    return await axiosClient.get(`/event/recommended`, { params: opt });
  },

  getTicketClassByEventID: async (
    id: string
  ): Promise<ApiResponse<TicketClass[]>> => {
    return await axiosClient.get(`/event/${id}/ticket-classes`);
  },
};

export default eventAPI;
