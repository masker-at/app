import { useMutation, useQueryClient } from 'react-query';
import { User } from '../utils/api/me';
import { updateEmail } from '../utils/api/settings';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangeEmail = () => {
  const queryClient = useQueryClient();

  return useMutation<User, any, string>((email: string) => updateEmail(email), {
    onSuccess: (user) => {
      queryClient.setQueryData('me', user);
    },
  });
};
export default useChangeEmail;
