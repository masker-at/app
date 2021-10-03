import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div id="page">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </div>
        <div
          id="modal"
          className="hidden fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 items-center justify-center"
        />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
