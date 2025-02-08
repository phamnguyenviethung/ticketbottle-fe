import { Box, Center, Container, Image, Text } from '@chakra-ui/react';
import logoDark from '@/assets/logoDark.svg';
const Footer: React.FC = () => {
  return (
    <Box id="footer" h="full" bgColor="blackAlpha.900" py={2} color="white">
      <Container h="full">
        <Center h="full" flexDirection="column" gapY={2}>
          <Image src={logoDark} alt="TicketBottle" />
          <Text fontWeight={500} fontSize="md">
            © 2025 TicketBottle. All rights reserved.
          </Text>
        </Center>
      </Container>
    </Box>
  );
};

export default Footer;
