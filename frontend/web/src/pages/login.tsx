import { FC, FormEvent, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/login/Input';
import { verifySession } from '../utils/api';

const LoginPage: FC = () => {
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

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
        <a href="https://masker.at">
          <img src="/img/logo.svg" alt="Masker@ logo" width="155" height="32" />
        </a>
      </header>
      <main className="w-full max-w-sm shadow-no-offset rounded p-5">
        <h1 className="font-quicksand text-3xl mb-3">Log in</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input placeholder="Email..." aria-label="Email" type="email" required />
          <div aria-hidden className="h-3" />
          <Input
            placeholder="Password..."
            aria-label="Password"
            type="password"
            required
            minLength={2}
          />

          <button
            type="submit"
            className="
              bg-primary
              text-white
              font-quicksand
              font-bold
              p-2
              w-20
              rounded
              mt-3
              ml-auto
              active:bg-primary-darker
              disabled:bg-gray-300
            "
          >
            Log in
          </button>
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
