import { useMutation, useQueryClient } from 'react-query';
import { User } from '../utils/api/me';
import { disable2FA } from '../utils/api/twoFactor';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDisable2FA = () => {
  const queryClient = useQueryClient();

  return useMutation<User, any, string>(disable2FA, {
    onSuccess: (user) => {
      queryClient.setQueryData('me', user);
    },
  });
};
export default useDisable2FA;
