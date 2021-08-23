import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Head from 'next/head';
import Cookies from 'cookies';
import me from '../utils/api/me';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import Input from '../components/Input';

const SettingsPage: FC = () => (
  <div className="container mx-auto px-10 overflow-auto min-h-screen flex flex-col">
    <Head>
      <title>Masker@</title>
    </Head>

    <Header />
    <div className="flex-1 flex flex-col sm:flex-row">
      <Sidebar />
      <main className="flex-grow sm:pl-5 xl:mr-72 flex flex-col">
        <section className="my-2">
          <h1 className="text-2xl font-quicksand">Email</h1>
          <p className="text-sm mt-1 mb-2">
            We will forward incoming emails from your aliases to this address, as well as send you
            system emails
          </p>
          <form>
            <div className="flex flex-col w-64">
              <Input placeholder="Email..." aria-label="Email" />
              <button type="submit" className="button bg-primary active:bg-primary-darker mt-2">
                Save
              </button>
            </div>
            <p className="text-sm text-gray-500">You will need to verify your new email</p>
          </form>
        </section>

        <section className="my-2">
          <h1 className="text-2xl font-quicksand">Password</h1>
          <p className="text-sm mt-1 mb-2">You can change the password of your account here</p>
          <form className="flex flex-col w-64 items-stretch">
            <Input placeholder="Current password..." aria-label="Current password" />
            <div aria-hidden className="h-2" />
            <Input placeholder="New password..." aria-label="New password" />
            <div aria-hidden className="h-2" />
            <Input placeholder="Repeat new password..." aria-label="Repeat new password" />
            <button type="submit" className="button bg-primary active:bg-primary-darker mt-2">
              Save
            </button>
          </form>
        </section>
      </main>
    </div>
  </div>
);
export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient();

  const cookies = new Cookies(req, res);
  const csrfToken = cookies.get('ct');
  await queryClient.prefetchQuery('me', () => me(req.headers.cookie, csrfToken));
  if (queryClient.getQueryState('me')?.error) {
    return {
      redirect: {
        statusCode: 302,
        destination: 'https://masker.at',
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
