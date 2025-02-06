import eventAPI from '@/apis/event.api';
import { useQuery } from '@tanstack/react-query';

const useEventListByCategory = () => {
  const query = useQuery({
    queryKey: ['eventListByCate'],
    queryFn: eventAPI.getEventsListByCategory,
    select: (res) => res.data,
  });

  return {
    query,
  };
};

export default useEventListByCategory;
