import { Box, Icon, Image } from '@chakra-ui/react';
import React from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import { Event } from '../../interfaces/event.interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@tanstack/react-router';

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
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
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
              <Link
                to={`/event/$eventID`}
                params={{
                  eventID: event.id,
                }}
                key={event.id}
              >
                <Box
                  w="full"
                  p={{
                    base: 0,
                    md: 4,
                  }}
                >
                  <Image
                    borderRadius="sm"
                    w="full"
                    maxH="400px"
                    src={event.eventInfo.thumbnail}
                    objectFit={'contain'}
                  />
                </Box>
              </Link>
            );
          })}
      </Slider>
    </Box>
  );
};

export default BigEventCoverSlider;
