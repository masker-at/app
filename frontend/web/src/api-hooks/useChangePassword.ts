import { useMutation } from 'react-query';
import { User } from '../utils/api/me';
import { updatePassword } from '../utils/api/settings';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangeEmail = () =>
  useMutation<User, any, { currentPassword: string; newPassword: string }>(
    ({ currentPassword, newPassword }) => updatePassword(currentPassword, newPassword),
  );
export default useChangeEmail;
