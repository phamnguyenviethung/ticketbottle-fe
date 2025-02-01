import { Box, Container, Image, Separator } from "@chakra-ui/react";
import logo from "@/assets/logo.svg";
const Header: React.FC = () => {
  return (
    <Container h="full" py={2}>
      <Box
        h="full"
        display="flex"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Image src={logo} />
        </Box>
        <Box>search</Box>
        <Box>account</Box>
      </Box>
      <Separator />
    </Container>
  );
};

export default Header;
