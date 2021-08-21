import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { Alias, deleteAlias } from '../utils/api/aliases';

const useDeleteAlias = (): UseMutationResult<Alias, Error, { id: number }> => {
  const queryClient = useQueryClient();

  return useMutation<Alias, Error, { id: number }, { i: number; alias: Alias } | null>(
    ({ id }) => deleteAlias(id),
    {
      onMutate: ({ id }) => {
        const data: Alias[] | undefined = queryClient.getQueryData('aliases');
        if (!data) return null;
        for (let i = 0; i < data.length; i += 1) {
          const alias = data[i];
          if (alias.id === id) {
            const aliasCopy = { ...alias };
            data.splice(i, 1);
            queryClient.setQueryData('aliases', data);
            return { i, alias: aliasCopy };
          }
        }
        return null;
      },
      onError: (error, variables, context) => {
        if (context) {
          const data: Alias[] = queryClient.getQueryData('aliases')!;
          data.splice(context.i, 0, context.alias);
          queryClient.setQueryData('aliases', data);
        }
      },
    },
  );
};
export default useDeleteAlias;
