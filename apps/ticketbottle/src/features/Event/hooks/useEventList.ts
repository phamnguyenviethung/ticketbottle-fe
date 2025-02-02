import eventAPI, { GetEventsOptions } from '@/apis/event.api';
import { useQuery } from '@tanstack/react-query';

interface UseEventListOptions {
  apiParams?: GetEventsOptions;
}

const useEventList = (opt: UseEventListOptions) => {
  const eventListQuery = useQuery({
    queryKey: ['eventList'],
    queryFn: () => eventAPI.getEvents({ includeInfo: true, ...opt.apiParams }),
    select: (res) => res.data,
  });

  return {
    query: eventListQuery,
  };
};

export default useEventList;
