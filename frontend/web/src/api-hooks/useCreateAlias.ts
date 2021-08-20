import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { Alias, createAlias } from '../utils/api/aliases';

const useCreateAlias = (): UseMutationResult<Alias, Error, { name?: string }> => {
  const queryClient = useQueryClient();

  return useMutation<Alias, Error, { name?: string }>(({ name }) => createAlias(name), {
    onSuccess: (newAlias) => {
      queryClient.setQueryData('aliases', [
        { isNew: true, ...newAlias },
        ...(queryClient.getQueryData('aliases') as Alias[]),
      ]);
    },
  });
};
export default useCreateAlias;
