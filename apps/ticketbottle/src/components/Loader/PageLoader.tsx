import { Center, Container } from '@chakra-ui/react';
import HashLoader from 'react-spinners/HashLoader';

const PageLoader = () => {
  return (
    <Container h="400px">
      <Center h="full" w="full">
        <HashLoader
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Center>
    </Container>
  );
};

export default PageLoader;
