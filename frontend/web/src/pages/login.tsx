import { FC, FormEvent, useCallback } from 'react';
import Input from '../components/login/Input';

const LoginPage: FC = () => {
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

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
    </div>
  );
};
export default LoginPage;
