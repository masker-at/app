import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Input from '../components/Input';
import { login, verifySession } from '../utils/api';

const LoginPage: FC = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (await verifySession()) {
        await router.push('/dashboard');
      }
    })();
  }, [router]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorLocation, setErrorLocation] = useState<'EMAIL' | 'PASSWORD' | 'FORM' | null>(null);

  const [emailValue, setEmailValue] = useState('');
  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
    setErrorLocation(null);
  }, []);

  const [passwordValue, setPasswordValue] = useState('');
  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    setErrorLocation(null);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        await login(emailValue, passwordValue);
        await router.push('/dashboard');
      } catch (err) {
        switch (err.response?.data.code) {
          case 'USER_NOT_FOUND':
            setErrorLocation('EMAIL');
            setErrorMessage("A user with this email doesn't exist. Did you want to sign up?");
            break;
          case 'INVALID_PASSWORD':
            setErrorLocation('PASSWORD');
            setErrorMessage('The password you entered is incorrect');
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
        <title>Log In - Masker@</title>
      </Head>
      <header className="flex flex-col items-center mb-5">
        <a href="https://masker.at">
          <img src="/img/logo.svg" alt="Masker@ logo" width="155" height="32" />
        </a>
      </header>
      <main className="w-full max-w-sm shadow-no-offset rounded p-5">
        <h1 className="font-quicksand text-3xl mb-3">Log in</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input
            placeholder="Email..."
            aria-label="Email"
            type="email"
            required
            value={emailValue}
            onChange={handleEmailChange}
            style={{
              borderColor:
                errorMessage && errorLocation === 'EMAIL' ? 'rgb(220, 38, 38)' : undefined,
            }}
          />
          {errorMessage && errorLocation === 'EMAIL' && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
          <div aria-hidden className="h-3" />
          <Input
            placeholder="Password..."
            aria-label="Password"
            type="password"
            required
            minLength={2}
            value={passwordValue}
            onChange={handlePasswordChange}
            style={{
              borderColor:
                errorMessage && errorLocation === 'PASSWORD' ? 'rgb(220, 38, 38)' : undefined,
            }}
          />
          {errorMessage && errorLocation === 'PASSWORD' && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
          {errorMessage && errorLocation === 'FORM' && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="flex justify-between items-center mt-3">
            <Link href="/forgot-password">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="text-primary-darker font-bold">Forgot your password?</a>
            </Link>

            <button type="submit" className="button bg-primary active:bg-primary-darker">
              Log in
            </button>
          </div>
        </form>
      </main>
      <p className="mt-5 font-quicksand">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-primary-darker font-bold">Sign up</a>
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
