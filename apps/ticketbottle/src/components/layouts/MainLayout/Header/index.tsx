import logo from '@/assets/logo.svg';
import { Avatar } from '@/components/ui/avatar';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import useAppStore from '@/store/useStore';
import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Separator,
  Text,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

const LOGOUT_VALUE = 'logout';

const menuData = [
  {
    title: 'Tài khoản',
    value: '/profile',
  },
  {
    title: 'Vé đã mua',
    value: '/my-orders',
  },
  {
    title: 'Đăng xuất',
    value: '/',
    type: LOGOUT_VALUE,
  },
];

const Header: React.FC = () => {
  const user = useAppStore((state) => state.user);
  return (
    <Container h="full" py={2}>
      <Box
        h="full"
        display="flex"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link to="/">
          <Box h="full">
            <Image src={logo} />
          </Box>
        </Link>
        <Box>search</Box>
        <Box>
          {user ? (
            <MenuRoot size="md">
              <MenuTrigger>
                <HStack
                  userSelect="none"
                  cursor="pointer"
                  p={{
                    base: 0,
                    md: 2,
                  }}
                  backgroundColor={{
                    base: 'transparent',
                    md: 'gray.100',
                  }}
                  borderRadius="full"
                >
                  <Avatar
                    size={{
                      base: 'lg',
                      md: 'sm',
                    }}
                    name={`${user.firstName} ${user.lastName}`}
                  />
                  <Text
                    display={{
                      base: 'none',
                      md: 'block',
                    }}
                    fontSize="sm"
                    fontWeight="500"
                  >{`${user.firstName} ${user.lastName}`}</Text>
                </HStack>
              </MenuTrigger>
              <MenuContent>
                {menuData.map((i) => {
                  return (
                    <MenuItem key={i.title} value={i.value} cursor="pointer">
                      {i.type === LOGOUT_VALUE ? (
                        <Box
                          cursor="pointer"
                          onClick={useAppStore.getState().logout}
                        >
                          {i.title}
                        </Box>
                      ) : (
                        <Link to={`${i.value}`}>
                          <Box cursor="pointer">{i.title}</Box>
                        </Link>
                      )}
                    </MenuItem>
                  );
                })}
              </MenuContent>
            </MenuRoot>
          ) : (
            <Link to="/auth/login">
              <Button>Đăng Nhập</Button>
            </Link>
          )}
        </Box>
      </Box>
      <Separator />
    </Container>
  );
};

export default Header;
