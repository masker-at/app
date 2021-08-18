import { FC, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import me from '../../utils/api/me';
import pollEmailVerification from '../../utils/api/pollEmailVerification';

const EmailUnverified: FC = () => {
  const { data } = useQuery('me', () => me());
  const queryClient = useQueryClient();
  const pollEmailVerificationPromiseRef = useRef<Promise<void>>();

  useEffect(() => {
    pollEmailVerificationPromiseRef.current = pollEmailVerification();
  }, []);

  useEffect(() => {
    (async () => {
      await pollEmailVerificationPromiseRef.current;
      queryClient.setQueryData('me', {
        ...queryClient.getQueryData('me'),
        isEmailVerified: true,
      });
    })();
  }, [queryClient]);

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen text-center">
      <p>
        We&apos;ve sent a verification email to <b>{data?.email}</b>.
        <br />
        Please click the link in it to start using Masker@
      </p>

      <a
        href={`https://${data!.email.split('@')[1]}`}
        className="bg-primary text-white font-quicksand font-bold px-3 py-2 rounded mt-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open inbox
      </a>
    </main>
  );
};
export default EmailUnverified;
