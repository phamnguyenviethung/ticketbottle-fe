import useAppStore from '@/store/useStore';
import { ParsedLocation, redirect } from '@tanstack/react-router';
import _ from 'lodash';

export default async ({ location }: { location: ParsedLocation }) => {
  const token = useAppStore.getState().token;
  if (_.isEmpty(token)) {
    throw redirect({
      to: '/auth/login',
      search: {
        redirect: location.href,
      },
    });
  }
};
