import { useMutation } from 'react-query';
import { generateRecoveryCodes } from '../utils/api/twoFactor';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGenerateRecoveryCodes = () => useMutation(generateRecoveryCodes);
export default useGenerateRecoveryCodes;
