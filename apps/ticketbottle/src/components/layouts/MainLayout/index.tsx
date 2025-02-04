import { Box, Container } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 85;
const FOOTER_HEIGHT = 100;

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Box h={`${HEADER_HEIGHT}px`}>
        <Header />
      </Box>
      <Container h={`calc(100vh - ${FOOTER_HEIGHT + HEADER_HEIGHT}px)`}>
        {children}
      </Container>
      <Box h={`${FOOTER_HEIGHT}px`}>
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
