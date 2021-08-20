import { useQueryClient } from 'react-query';
import { Alias } from '../utils/api/aliases';

// eslint-disable-next-line no-unused-vars
const useFinishAliasCreation = (): ((id: number) => void) => {
  const queryClient = useQueryClient();

  return (id) => {
    const data: Alias[] = queryClient.getQueryData('aliases')!;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id === id) {
        data[i] = { ...data[i], isNew: false };
        break;
      }
    }
    queryClient.setQueryData('aliases', data);
  };
};
export default useFinishAliasCreation;
