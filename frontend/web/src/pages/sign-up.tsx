import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import Input from '../components/Input';
import signUp from '../utils/api/signUp';
import verifySession from '../utils/api/verifySession';

const SignUpPage: FC = () => {
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

  const [errorLocation, setErrorLocation] = useState<'EMAIL' | 'FORM' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        await signUp(emailValue, passwordValue);
        await router.push('/dashboard');
      } catch (err) {
        switch (err.response?.data.code) {
          case 'USER_ALREADY_EXISTS':
            setErrorLocation('EMAIL');
            setErrorMessage('A user with this email already exists. Did you want to log in?');
            break;
          default:
            setErrorLocation('FORM');
            setErrorMessage('Sorry, something went wrong. Please try later');
        }
      }
    },
    [emailValue, passwordValue, router],
  );

  return (
    <div className="h-screen flex flex-col justify-center items-center px-5">
      <Head>
        <title>Sign Up - Masker@</title>
      </Head>
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
            style={{
              borderColor: errorLocation === 'EMAIL' ? 'rgb(220, 38, 38)' : undefined,
            }}
          />
          {errorLocation === 'EMAIL' && errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
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
              borderColor:
                isRepeatPasswordTouched && passwordValue !== repeatPasswordValue
                  ? 'rgb(220, 38, 38)'
                  : undefined,
            }}
          />
          {isRepeatPasswordTouched &&
            (passwordValue === repeatPasswordValue ? (
              <p className="text-sm text-green-600">Passwords match</p>
            ) : (
              <p className="text-sm text-red-600">Passwords do not match</p>
            ))}

          {errorLocation === 'FORM' && errorMessage && (
            <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="button bg-primary active:bg-primary-darker mt-5"
            disabled={isSubmitButtonDisabled}
          >
            Register
          </button>
          <p className="text-sm text-gray-400 text-center">No credit card required</p>
        </form>
      </main>
      <p className="mt-5 font-quicksand">
        Already have an account?{' '}
        <Link href="/login">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-primary-darker font-bold">Log in</a>
        </Link>
      </p>
    </div>
  );
};
export default SignUpPage;
