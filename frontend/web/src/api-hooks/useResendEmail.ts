import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import resendEmail from '../utils/api/resendEmail';

const useResendEmail = (): UseMutationResult => {
  const queryClient = useQueryClient();

  return useMutation(resendEmail, {
    onSuccess: (lastEmailVerificationSentDate) => {
      queryClient.setQueryData('me', {
        ...queryClient.getQueryData('me'),
        lastEmailVerificationSentDate,
      });
    },
  });
};
export default useResendEmail;
