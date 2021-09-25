import { useMutation, useQueryClient } from 'react-query';
import switchPlan from '../utils/api/switchPlan';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSwitchPlan = () => {
  const queryClient = useQueryClient();

  return useMutation(switchPlan, {
    onSuccess: (user) => {
      queryClient.setQueryData('me', user);
    },
  });
};
export default useSwitchPlan;
