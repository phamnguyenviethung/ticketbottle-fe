import { createFileRoute, Outlet } from '@tanstack/react-router';
import logo from '@/assets/logo.svg';
import { Box, Center, Container, Image } from '@chakra-ui/react';
export const Route = createFileRoute('/_layout/_auth-layout')({
  component: RouteComponent,
});

const HEADER_HEIGHT = 60;

function RouteComponent() {
  return (
    <Box>
      <Center h={`${HEADER_HEIGHT}px`} py={4}>
        <Box>
          <Image src={logo} alt="logo" />
        </Box>
      </Center>
      <Container h={`calc(100vh - ${HEADER_HEIGHT}px)`}>
        <Outlet />
      </Container>
    </Box>
  );
}
