import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Cookies from 'cookies';
import me from '../utils/api/me';
import EmailUnverified from '../components/dashboard/EmailUnverified';

const DashboardPage: FC = () => {
  const { data } = useQuery('me', () => me());

  return data?.isEmailVerified ? <div>Hello {data.email}</div> : <EmailUnverified />;
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
