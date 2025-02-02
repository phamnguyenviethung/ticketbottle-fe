import { EventListResponse } from '@/features/Event/interfaces/event.interface';
import axiosClient from './axiosClient';

export interface GetEventsOptions {
  page?: number;
  perPage?: number;
  includeInfo?: true;
}

const eventAPI = {
  getEvents: async (options?: GetEventsOptions): Promise<EventListResponse> => {
    return await axiosClient.get('/event', { params: options });
  },
};

export default eventAPI;
