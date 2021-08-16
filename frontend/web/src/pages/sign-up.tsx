import { FC, FormEvent, useCallback } from 'react';
import Input from '../components/login/Input';

const SignUpPage: FC = () => {
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

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
          />
          <div aria-hidden className="h-5" />
          <Input
            placeholder="Choose a password..."
            aria-label="Password"
            type="password"
            required
            minLength={2}
          />
          <div aria-hidden className="h-3" />
          <Input
            placeholder="Repeat your password..."
            aria-label="Repeat your password"
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
              rounded
              mt-5
              active:bg-primary-darker
              disabled:bg-gray-300
            "
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
