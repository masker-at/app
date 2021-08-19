import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import pollEmailVerification from '../utils/api/pollEmailVerification';

const usePollEmailVerification = (): UseMutationResult => {
  const queryClient = useQueryClient();

  return useMutation(pollEmailVerification, {
    onSuccess: () => {
      queryClient.setQueryData('me', {
        ...queryClient.getQueryData('me'),
        isEmailVerified: true,
      });
    },
  });
};
export default usePollEmailVerification;
