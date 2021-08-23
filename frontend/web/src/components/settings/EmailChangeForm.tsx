import { useRouter } from 'next/router';
import { FC, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useChangeEmail from '../../api-hooks/useChangeEmail';
import me from '../../utils/api/me';
import Input from '../Input';

const EmailChangeForm: FC = () => {
  const { data } = useQuery('me', () => me());
  const { email } = data!;
  const [emailValue, setEmailValue] = useState(email);
  useEffect(() => setEmailValue(email), [email]);

  const { mutateAsync, error, reset } = useChangeEmail();

  const router = useRouter();

  const handleSubmit: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await mutateAsync(emailValue);
        await router.push('/dashboard');
      } catch {}
    },
    [emailValue, mutateAsync, router],
  );

  let errorMessage: string | null = null;
  if (error) {
    switch (error.response?.data.code) {
      case 'USER_ALREADY_EXISTS':
        errorMessage = 'This email is already used by another account';
        break;
      default:
        errorMessage = 'Sorry, something went wrong. Please try later';
    }
  }

  return (
    <>
      <h1 className="text-2xl font-quicksand">Email</h1>
      <p className="text-sm mt-1 mb-2">
        We will forward incoming emails from your aliases to this address, as well as send you
        system emails
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-64">
          <Input
            type="email"
            required
            placeholder="Email..."
            aria-label="Email"
            value={emailValue}
            onChange={({ target }) => {
              setEmailValue(target.value);
              reset();
            }}
          />

          {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="button bg-primary active:bg-primary-darker mt-2"
            disabled={emailValue === data!.email}
          >
            Save
          </button>
        </div>
        {emailValue !== data!.email && (
          <p className="text-sm text-gray-500">You will need to verify your new email</p>
        )}
      </form>
    </>
  );
};
export default EmailChangeForm;
