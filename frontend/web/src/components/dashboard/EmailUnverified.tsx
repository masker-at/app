import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import usePollEmailVerification from '../../api-hooks/usePollEmailVerification';
import useResendEmail from '../../api-hooks/useResendEmail';
import useCountdown from '../../hooks/useCountdown';
import me from '../../utils/api/me';

const EmailUnverified: FC = () => {
  const { data } = useQuery('me', () => me());

  const { mutate: pollEmailVerification } = usePollEmailVerification();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => pollEmailVerification({}), []);

  const { mutate: resendEmail } = useResendEmail();
  const countdown = useCountdown(Date.parse(data!.lastEmailVerificationSentDate) + 60000);

  return (
    <main className="flex flex-col items-center justify-start w-screen h-screen text-center">
      <p>
        We&apos;ve sent a verification email to <b>{data?.email}</b>.
        <br />
        Please click the link in it to start using Masker@
      </p>

      <a
        href={`https://${data!.email.split('@')[1]}`}
        className="bg-primary text-white font-quicksand font-bold px-3 py-2 rounded my-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open inbox
      </a>

      <p>Didn&apos;t get the email? Make sure to check your spam folder</p>

      <button
        type="button"
        className="button bg-primary active:bg-primary-darker"
        disabled={!!countdown}
        onClick={resendEmail}
      >
        Resend
        {countdown && ` in ${countdown}`}
      </button>
    </main>
  );
};
export default EmailUnverified;
