import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, FormEventHandler, useCallback, useEffect, useState } from 'react';
import Input from '../components/Input';
import useCountdown from '../hooks/useCountdown';
import sendPasswordReset from '../utils/api/sendPasswordReset';
import verifySession from '../utils/api/verifySession';

const ForgotPasswordPage: FC = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (await verifySession()) {
        await router.push('/dashboard');
      }
    })();
  }, [router]);

  const [emailValue, setEmailValue] = useState('');
  const [lastPasswordResetSentDate, setLastPasswordResetSentDate] = useState(
    '1970-01-01T00:00:00.000Z',
  );
  const handleSubmit: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setLastPasswordResetSentDate(await sendPasswordReset(emailValue));
    },
    [emailValue],
  );

  const countdown = useCountdown(Date.parse(lastPasswordResetSentDate) + 60000);

  return (
    <div className="h-screen flex flex-col justify-center items-center px-5">
      <Head>
        <title>Forgot Password - Masker@</title>
      </Head>
      <header className="flex flex-col items-center mb-5">
        <a href="https://masker.at">
          <img src="/img/logo.svg" alt="Masker@ logo" width="155" height="32" />
        </a>
      </header>
      <main className="w-full max-w-sm shadow-no-offset rounded p-5">
        <h1 className="font-quicksand text-3xl mb-3">Reset password</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email" className="flex flex-col mb-2">
            Enter your email:
            <Input
              placeholder="example@example.com"
              aria-label="Email"
              type="email"
              required
              id="email"
              value={emailValue}
              onChange={({ target }) => setEmailValue(target.value)}
            />
          </label>

          <p className="text-sm">We will send you an email with a link to change your password.</p>

          <button
            type="submit"
            className="button bg-primary active:bg-primary-darker mt-5"
            disabled={!!countdown}
          >
            {countdown ? `Resend in ${countdown}` : 'Submit'}
          </button>
        </form>
      </main>
      <p className="mt-5 font-quicksand">
        <Link href="/login">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-primary-darker font-bold">Log in</a>
        </Link>
      </p>
    </div>
  );
};
export default ForgotPasswordPage;
