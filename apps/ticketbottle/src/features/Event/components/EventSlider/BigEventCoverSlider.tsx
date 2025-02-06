import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import { Event } from '../../interfaces/event.interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface BigEventCoverSliderProps {
  data: Event[] | [];
  isLoading?: boolean;
}

const SampleNextArrow: React.FC<CustomArrowProps> = (
  props: CustomArrowProps
) => {
  const { className, style, onClick } = props;
  return (
    <Icon
      className={className}
      onClick={onClick}
      background={'gray.100'}
      color="blackAlpha.800"
      borderRadius="full"
      w={{
        base: '30px',
        md: '40px',
      }}
      h={{
        base: '30px',
        md: '40px',
      }}
      p={2}
      _hover={{
        background: 'gray.200',
        color: 'blackAlpha.800',
      }}
      style={{
        ...style,
        right: '10px',
      }}
    >
      <ChevronRight />
    </Icon>
  );
};

const SamplePrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <Icon
      className={className}
      onClick={onClick}
      background={'gray.100'}
      color="blackAlpha.800"
      borderRadius="full"
      w={{
        base: '30px',
        md: '40px',
      }}
      h={{
        base: '30px',
        md: '40px',
      }}
      p={2}
      _hover={{
        background: 'gray.200',
        color: 'blackAlpha.800',
      }}
      style={{
        ...style,
        left: '10px',
        zIndex: 99,
      }}
    >
      <ChevronLeft />
    </Icon>
  );
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const BigEventCoverSlider: React.FC<BigEventCoverSliderProps> = ({
  data,
  isLoading,
}) => {
  if (isLoading) {
    return <Skeleton height="400px" />;
  }

  return (
    <Box maxW="full">
      <Slider {...settings}>
        {data
          .filter((e: Event) => e.eventInfo)
          .map((event: Event) => {
            return (
              <Box
                borderRadius="lg"
                key={event.id}
                w="full"
                h={{
                  base: '200px',
                  md: '400px',
                }}
                backgroundImage={`url(${event.eventInfo.thumbnail})`}
                backgroundSize="contain"
              />
            );
          })}
      </Slider>
    </Box>
  );
};

export default BigEventCoverSlider;
