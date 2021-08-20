import { QueryFunction, useInfiniteQuery } from 'react-query';
import { Alias, listAliases } from '../utils/api/aliases';

const fetchAliasList: QueryFunction<{ data: Alias[]; nextPageParam?: number }> = async ({
  pageParam = 0,
}) => {
  const aliases = await listAliases(pageParam, 50);
  return {
    data: aliases,
    nextPageParam: aliases.length < 50 ? undefined : pageParam + 50,
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAliasList = () =>
  useInfiniteQuery('aliases', fetchAliasList, {
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
  });
export default useAliasList;
