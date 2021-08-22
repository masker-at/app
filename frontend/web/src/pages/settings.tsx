import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Head from 'next/head';
import Cookies from 'cookies';
import me from '../utils/api/me';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';

const SettingsPage: FC = () => (
  <div className="container mx-auto px-10 overflow-auto min-h-screen flex flex-col">
    <Head>
      <title>Masker@</title>
    </Head>

    <Header />
    <div className="flex-1 flex flex-col sm:flex-row">
      <Sidebar />
      
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
