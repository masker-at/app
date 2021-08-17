import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import Input from '../components/login/Input';
import { verifySession } from '../utils/api';

const SignUpPage: FC = () => {
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

  const [emailValue, setEmailValue] = useState('');
  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  }, []);

  const [passwordValue, setPasswordValue] = useState('');
  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  }, []);

  const [isRepeatPasswordTouched, setIsRepeatPasswordTouched] = useState(false);
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const handleRepeatPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsRepeatPasswordTouched(true);
    setRepeatPasswordValue(event.target.value);
  }, []);

  const isSubmitButtonDisabled =
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailValue,
    ) ||
    passwordValue.length < 2 ||
    passwordValue !== repeatPasswordValue;

  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (await verifySession()) {
        await router.push('/dashboard');
      }
    })();
  }, [router]);

  return (
    <div className="h-screen flex flex-col justify-center items-center px-5">
      <header className="flex flex-col items-center mb-5">
        <h1 className="font-quicksand text-3xl mb-3 text-center">
          <a href="https://masker.at">
            <img
              src="/img/logo.svg"
              alt="Masker@ logo"
              width="155"
              height="32"
              className="mx-auto"
            />
          </a>
          Get started
        </h1>
        <h2>Protect your inbox from unwanted emails</h2>
      </header>
      <main className="w-full max-w-sm shadow-no-offset rounded p-5">
        <h3 className="font-quicksand text-3xl mb-3 text-center">Sign up</h3>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input
            placeholder="Your email address..."
            aria-label="Your email address"
            type="email"
            required
            value={emailValue}
            onChange={handleEmailChange}
          />
          <div aria-hidden className="h-5" />
          <Input
            placeholder="Choose a password..."
            aria-label="Password"
            type="password"
            required
            minLength={2}
            value={passwordValue}
            onChange={handlePasswordChange}
          />
          <div aria-hidden className="h-3" />
          <Input
            placeholder="Repeat your password..."
            aria-label="Repeat your password"
            type="password"
            required
            minLength={2}
            value={repeatPasswordValue}
            onChange={handleRepeatPasswordChange}
            style={{
              // eslint-disable-next-line no-nested-ternary
              borderColor: isRepeatPasswordTouched
                ? passwordValue === repeatPasswordValue
                  ? 'rgb(5, 150, 105)'
                  : 'rgb(220, 38, 38)'
                : undefined,
            }}
          />
          {isRepeatPasswordTouched &&
            (passwordValue === repeatPasswordValue ? (
              <p className="text-sm text-green-600">Passwords match</p>
            ) : (
              <p className="text-sm text-red-600">Passwords do not match</p>
            ))}

          <button
            type="submit"
            className="
              bg-primary
              text-white
              font-quicksand
              font-bold
              p-2
              rounded
              mt-5
              active:bg-primary-darker
              disabled:bg-gray-300
              disabled:cursor-default
            "
            disabled={isSubmitButtonDisabled}
          >
            Register
          </button>
          <p className="text-sm text-gray-400 text-center">No credit card required</p>
        </form>
      </main>
    </div>
  );
};
export default SignUpPage;
