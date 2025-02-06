import { ApiResponse } from '@/apis/axiosClient';
import { PagiantionData } from '@/interfaces/pagination.interface';

export interface EventInfo {
  id: string;
  name: string;
  locaiton: string;
  thumbnail: string;
  startDate: Date;
  eventId: string;
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
