import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { User } from '../utils/api/me';
import openCheckout from '../utils/openCheckout';

const useOpenCheckout = (): (() => void) => {
  const queryClient = useQueryClient();
  return useCallback(async () => {
    const me = queryClient.getQueryData('me') as User;
    await openCheckout(me);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await queryClient.invalidateQueries('me');
  }, [queryClient]);
};
export default useOpenCheckout;
