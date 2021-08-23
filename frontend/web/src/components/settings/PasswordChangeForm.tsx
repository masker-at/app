import { ChangeEvent, FC, useCallback, useState } from 'react';
import useChangePassword from '../../api-hooks/useChangePassword';
import Input from '../Input';

const PasswordChangeForm: FC = () => {
  const [currentPasswordValue, setCurrentPasswordValue] = useState('');
  const handleCurrentPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPasswordValue(event.target.value);
  }, []);

  const [newPasswordValue, setNewPasswordValue] = useState('');
  const handleNewPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewPasswordValue(event.target.value);
  }, []);

  const [isRepeatPasswordTouched, setIsRepeatPasswordTouched] = useState(false);
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const handleRepeatPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsRepeatPasswordTouched(true);
    setRepeatPasswordValue(event.target.value);
  }, []);

  const isSubmitButtonDisabled =
    currentPasswordValue.length < 2 ||
    newPasswordValue.length < 2 ||
    newPasswordValue !== repeatPasswordValue;

  const { mutateAsync, error } = useChangePassword();
  const [isSaved, setIsSaved] = useState(false);

  let errorMessage: string | null = null;
  if (error) {
    switch (error.response?.data.code) {
      case 'INVALID_PASSWORD':
        errorMessage = 'The current password you entered is incorrect';
        break;
      default:
        errorMessage = 'Sorry, something went wrong. Please try later';
    }
  }

  return (
    <>
      <h1 className="text-2xl font-quicksand">Password</h1>
      <p className="text-sm mt-1 mb-2">You can change the password of your account here</p>
      <form
        className="flex flex-col w-64 items-stretch"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await mutateAsync({
              currentPassword: currentPasswordValue,
              newPassword: newPasswordValue,
            });
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
          } catch {}
        }}
      >
        <Input
          type="password"
          placeholder="Your current password..."
          aria-label="Current password"
          value={currentPasswordValue}
          onChange={handleCurrentPasswordChange}
        />
        <div aria-hidden className="h-2" />
        <Input
          type="password"
          placeholder="New password..."
          aria-label="New password"
          value={newPasswordValue}
          onChange={handleNewPasswordChange}
        />
        <div aria-hidden className="h-2" />

        <Input
          type="password"
          placeholder="Repeat your new password..."
          aria-label="Repeat new password"
          value={repeatPasswordValue}
          onChange={handleRepeatPasswordChange}
          style={{
            borderColor:
              isRepeatPasswordTouched && newPasswordValue !== repeatPasswordValue
                ? 'rgb(220, 38, 38)'
                : undefined,
          }}
        />
        {isRepeatPasswordTouched &&
          (newPasswordValue === repeatPasswordValue ? (
            <p className="text-sm text-green-600">Passwords match</p>
          ) : (
            <p className="text-sm text-red-600">Passwords do not match</p>
          ))}

        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="button bg-primary active:bg-primary-darker mt-2"
          disabled={isSubmitButtonDisabled}
        >
          {isSaved ? 'Saved!' : 'Save'}
        </button>
      </form>
    </>
  );
};
export default PasswordChangeForm;
