import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

import apiClient from '../utils/api/client';

const IndexPage: FC = () => null;
export default IndexPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const session = cookies.get('sid');
  const csrfToken = cookies.get('ct');
  if (!session || !csrfToken) {
    return {
      redirect: {
        statusCode: 302,
        destination: 'https://masker.at',
      },
    };
  }

  const { data } = await apiClient.get('/auth/verify-session', {
    headers: {
      Cookie: req.headers.cookie,
      'X-CSRF-Token': csrfToken,
    },
  });
  return {
    redirect: {
      statusCode: 302,
      destination: data.isValid ? '/dashboard' : 'https://masker.at',
    },
  };
};
