import {
  Box,
  Button,
  Container,
  Image,
  Separator,
  Text,
} from '@chakra-ui/react';
import logo from '@/assets/logo.svg';
import useAppStore from '@/store/useStore';
const Header: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
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
        <Box>
          <Text>{`${user?.firstName} ${user?.lastName}`}</Text>
          <Button onClick={logout}>dang xuat</Button>
        </Box>
      </Box>
      <Separator />
    </Container>
  );
};

export default Header;
