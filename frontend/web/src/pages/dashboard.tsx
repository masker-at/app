import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Cookies from 'cookies';
import me from '../utils/api/me';
import EmailUnverified from '../components/dashboard/EmailUnverified';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import AliasList from '../components/dashboard/AliasList';

const DashboardPage: FC = () => {
  const { data } = useQuery('me', () => me());

  return (
    <div className="container mx-auto px-10 overflow-auto min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col sm:flex-row">
        <Sidebar />
        {data!.isEmailVerified ? <AliasList /> : <EmailUnverified />}
      </div>
    </div>
  );
};
export default DashboardPage;

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
