import { FC, useState } from 'react';
import useDisable2FA from '../../api-hooks/useDisable2FA';
import useGenerateRecoveryCodes from '../../api-hooks/useGenerateRecoveryCodes';
import Input from '../Input';

const TwoFactorEnabled: FC = () => {
  const [flowState, setFlowState] = useState<'INITIAL' | 'RECOVERY_GENERATED' | 'TURNING_OFF'>(
    'INITIAL',
  );

  const { mutateAsync: generateRecoveryCodes, data: recoveryCodes } = useGenerateRecoveryCodes();

  const { mutate: disable2FA, error } = useDisable2FA();
  let errorMessage: string | null = null;
  if (error) {
    switch (error.response?.data.code) {
      case 'INVALID_2FA_CODE':
        errorMessage = 'The code is invalid or expired. Please try again';
        break;
      default:
        errorMessage = 'Sorry, something went wrong. Please try later';
    }
  }

  switch (flowState) {
    case 'INITIAL':
      return (
        <div className="flex mt-2">
          <button
            type="button"
            className="button bg-primary active:bg-primary-darker"
            onClick={async () => {
              await generateRecoveryCodes();
              setFlowState('RECOVERY_GENERATED');
            }}
          >
            Regenerate recovery codes
          </button>
          <button
            type="button"
            className="button bg-red-700 active:bg-red-800 ml-2"
            onClick={() => setFlowState('TURNING_OFF')}
          >
            Turn off
          </button>
        </div>
      );

    case 'RECOVERY_GENERATED':
      return (
        <>
          <p>Here are your new recovery codes:</p>
          <ul className="font-mono mt-2">
            {recoveryCodes!.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
          <p>Your old recovery codes have been revoked.</p>
        </>
      );

    case 'TURNING_OFF':
      return (
        <>
          <p id="2fa-code-label">Enter an authenticator app code or a recovery code:</p>

          <form
            className="flex flex-col w-64"
            onSubmit={async (event) => {
              event.preventDefault();
              const input = document.getElementById('2fa-code') as HTMLInputElement;
              disable2FA(input.value);
            }}
          >
            <Input
              type="text"
              minLength={6}
              maxLength={15}
              id="2fa-code"
              aria-labelledby="2fa-code-label"
            />
            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              className="button bg-primary active:bg-primary-darker flex-1 w-full mt-2"
            >
              Next &rarr;
            </button>
          </form>
        </>
      );

    default:
      return null;
  }
};
export default TwoFactorEnabled;
