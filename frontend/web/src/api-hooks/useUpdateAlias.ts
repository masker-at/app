import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { Alias, updateAlias } from '../utils/api/aliases';

const useUpdateAlias = (): UseMutationResult<
  Alias,
  Error,
  { id: number; updateObject: { name?: string; isActive?: boolean } }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    Alias,
    Error,
    { id: number; updateObject: { name?: string; isActive?: boolean } },
    { i: number; alias: Alias } | null
  >(({ id, updateObject }) => updateAlias(id, updateObject), {
    onMutate: ({ id, updateObject }) => {
      const data: Alias[] | undefined = queryClient.getQueryData('aliases');
      if (!data) return null;
      for (let i = 0; i < data.length; i += 1) {
        const alias = data[i];
        if (alias.id === id) {
          const aliasCopy = { ...alias };
          Object.assign(alias, updateObject);
          queryClient.setQueryData('aliases', data);
          return { i, alias: aliasCopy };
        }
      }
      return null;
    },
    onError: (error, variables, context) => {
      if (context) {
        const data: Alias[] = queryClient.getQueryData('aliases')!;
        data[context.i] = context.alias;
        queryClient.setQueryData('aliases', data);
      }
    },
  });
};
export default useUpdateAlias;
