import { GetServerSideProps } from 'next';
import React, { FC, useEffect } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Head from 'next/head';
import Cookies from 'cookies';
import me from '../utils/api/me';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import useMeQuery from '../api-hooks/useMeQuery';
import FreeTrial from '../components/billing/FreeTrial';
import PaymentMethodAdded from '../components/billing/PaymentMethodAdded';

const SettingsPage: FC = () => {
  const { data } = useMeQuery();
  const { paymentMethod } = data!;

  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).Paddle) {
        clearInterval(interval);
        if (process.env.NEXT_PUBLIC_PADDLE_ENABLE_SANDBOX !== 'false') {
          (window as any).Paddle.Environment.set('sandbox');
        }
        (window as any).Paddle.Setup({
          vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
        });
      }
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-10 overflow-auto min-h-screen flex flex-col">
      <Head>
        <title>Masker@</title>
        <script src="https://cdn.paddle.com/paddle/paddle.js" />
      </Head>

      <Header />
      <div className="flex-1 flex flex-col sm:flex-row">
        <Sidebar />
        <main className="flex-grow sm:pl-5 xl:mr-72 flex flex-col">
          <h1 className="text-2xl font-quicksand mt-2">Billing</h1>
          {paymentMethod ? <PaymentMethodAdded /> : <FreeTrial />}
        </main>
      </div>
    </div>
  );
};
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
