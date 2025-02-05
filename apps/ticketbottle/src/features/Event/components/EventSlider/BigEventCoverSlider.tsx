import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import Slider from 'react-slick';
import { Event } from '../../interfaces/event.interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

interface BigEventCoverSliderProps {
  data: Event[] | [];
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  console.log(style);
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
}

function SamplePrevArrow(props) {
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
}

const BigEventCoverSlider: React.FC<BigEventCoverSliderProps> = ({ data }) => {
  return (
    <Box maxW="full">
      <Slider {...settings}>
        {data.map((event: Event) => {
          return (
            <Box
              key={event.id}
              w="full"
              h={{
                base: '200px',
                md: '400px',
              }}
              backgroundImage={`url(${event.eventInfo.thumbnail})`}
              backgroundSize="contain"
              backgroundPosition="center"
            />
          );
        })}
      </Slider>
    </Box>
  );
};

export default BigEventCoverSlider;
