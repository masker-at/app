import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode } from 'react';
import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps): ReactNode => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

export default App;
