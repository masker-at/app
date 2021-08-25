import { useMutation, useQueryClient } from 'react-query';
import { User } from '../utils/api/me';
import { enable2FA } from '../utils/api/twoFactor';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEnable2FA = () => {
  const queryClient = useQueryClient();

  return useMutation<User, any, string>(enable2FA, {
    onSuccess: (user) => {
      queryClient.setQueryData('me', user);
    },
  });
};
export default useEnable2FA;
