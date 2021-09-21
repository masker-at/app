import { useQuery } from 'react-query';
import me from '../utils/api/me';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useMeQuery = () => useQuery('me', () => me());
export default useMeQuery;
