import { useMutation } from 'react-query';
import { generate2FAToken } from '../utils/api/twoFactor';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGenerate2FAToken = () => useMutation(generate2FAToken);
export default useGenerate2FAToken;
