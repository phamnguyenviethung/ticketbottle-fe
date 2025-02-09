import { Button } from '@chakra-ui/react';
import { Event } from '../../interfaces/event.interface';
import { Link } from '@tanstack/react-router';

const BuyButton: React.FC<{ event: Event }> = ({ event }) => {
  if (!event) return null;
  return (
    <Link to="/checkout/$eventID" params={{ eventID: event.id }}>
      <Button colorPalette="green" w="full" size="2xl">
        Mua vé ngay - Từ 290.000 VNĐ
      </Button>
    </Link>
  );
};

export default BuyButton;
