import { toaster } from '@/components/ui/toaster';
import { AxiosError } from 'axios';

export default (error: unknown) => {
  if (error instanceof AxiosError) {
    toaster.create({
      type: 'error',
      title: error.response
        ? error.response.data.message.toString()
        : 'Something went wrong. Please try again later.',
    });
  }
};
