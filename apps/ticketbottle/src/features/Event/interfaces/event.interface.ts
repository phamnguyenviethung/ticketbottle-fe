import { ApiResponse } from '@/apis/axiosClient';
import { PagiantionData } from '@/interfaces/pagination.interface';

export interface EventInfo {
  id: string;
  name: string;
  location: string;
  thumbnail: string;
  startDate: Date;
  eventId: string;
  description: string;
}

export interface Event {
  id: string;
  isFree: boolean;
  status: string;
  startSellDate: string;
  eventInfo: EventInfo;
}

export interface EventListByCategory {
  categoryName: string;
  events: Event[] | [];
}

export type EventListResponse = ApiResponse<PagiantionData<Event>>;
