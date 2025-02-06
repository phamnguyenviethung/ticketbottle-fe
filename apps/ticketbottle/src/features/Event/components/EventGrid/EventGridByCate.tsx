import { Box, Tabs, Text } from '@chakra-ui/react';
import { EventListByCategory } from '../../interfaces/event.interface';
import EventGrid from '../EventGrid';
import EventGridLoading from './EventGridLoading';
import { useState } from 'react';
interface EventGridByCateProps {
  data: EventListByCategory[] | [];
  isLoading?: boolean;
}

const EventGridByCate: React.FC<EventGridByCateProps> = ({
  data,
  isLoading,
}) => {
  const [activeValue, setActiveValue] = useState(String(0));

  if (isLoading) {
    return <EventGridLoading />;
  }

  return (
    <Box>
      <Tabs.Root
        lazyMount
        defaultValue={String(0)}
        colorPalette="blue"
        size="lg"
        onValueChange={(e) => setActiveValue(e.value)}
      >
        <Tabs.List>
          {data.map((item: EventListByCategory, index: number) => {
            return (
              <Tabs.Trigger key={item.categoryName} value={String(index)}>
                <Text
                  fontWeight={600}
                  color={
                    activeValue === String(index) ? 'blue.solid' : 'gray.500'
                  }
                >
                  {item.categoryName}
                </Text>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        {data.map((item: EventListByCategory, index: number) => {
          return (
            <Tabs.Content key={item.categoryName} value={String(index)}>
              <EventGrid data={item.events} isLoading={isLoading} />
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </Box>
  );
};

export default EventGridByCate;
