import { useQuery } from 'react-query';
import { listAliases } from '../utils/api/aliases';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAliasList = () => useQuery('aliases', () => listAliases());
export default useAliasList;
