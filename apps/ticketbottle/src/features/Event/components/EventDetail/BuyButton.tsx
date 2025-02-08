import { Button } from '@chakra-ui/react';
import { Event } from '../../interfaces/event.interface';

const BuyButton: React.FC<{ event: Event }> = ({ event }) => {
  if (!event) return null;
  return (
    <Button colorPalette="green" w="full" size="2xl">
      Mua vé ngay - Từ 290.000 VNĐ
    </Button>
  );
};

export default BuyButton;
