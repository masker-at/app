import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { Alias, updateAlias } from '../utils/api/aliases';

const useRenameAlias = (): UseMutationResult<
  Alias,
  Error,
  { id: number; updateObject: { name?: string; isActive?: boolean } }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    Alias,
    Error,
    { id: number; updateObject: { name?: string; isActive?: boolean } },
  >(({ id, updateObject }) => updateAlias(id, updateObject), {
    onMutate: ({ id, updateObject }) => {
      const data: {
        pages: { data: Alias[] }[];
      } = queryClient.getQueryData('aliases')!;
      for (let i = 0; i < data.pages.length; i += 1) {
        for (let j = 0; j < data.pages[i].data.length; j += 1) {
          const alias = data.pages[i].data[j];
          if (alias.id === id) {
            Object.assign(alias, updateObject);
            break;
          }
        }
      }
      queryClient.setQueryData('aliases', data);
    },
    onSettled: () => queryClient.invalidateQueries('aliases'),
  });
};
export default useRenameAlias;
