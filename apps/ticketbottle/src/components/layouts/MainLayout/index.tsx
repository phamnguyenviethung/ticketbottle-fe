import { Box, Container } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 85;
const FOOTER_HEIGHT = 150;

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Box h={`${HEADER_HEIGHT}px`}>
        <Header />
      </Box>
      <Container
        py={4}
        minH={`calc(100vh - ${FOOTER_HEIGHT + HEADER_HEIGHT}px)`}
      >
        {children}
      </Container>
      <Box h={`${FOOTER_HEIGHT}px`}>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
