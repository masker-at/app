import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import usePollEmailVerification from '../../api-hooks/usePollEmailVerification';
import useResendEmail from '../../api-hooks/useResendEmail';
import me from '../../utils/api/me';

const EmailUnverified: FC = () => {
  const { data } = useQuery('me', () => me());

  const { mutate: pollEmailVerification } = usePollEmailVerification();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => pollEmailVerification({}), []);

  const { mutate: resendEmail } = useResendEmail();
  const [timeLeftMs, setTimeLeftMs] = useState(
    Date.parse(data!.lastEmailVerificationSentDate) - Date.now(),
  );
  const timeLeftMin = Math.floor(timeLeftMs / 60000);
  const timeLeftSeconds = Math.floor((timeLeftMs - timeLeftMin * 60000) / 1000);
  const timeLeftSecondsLeadingZero = `${timeLeftSeconds < 10 ? '0' : ''}${timeLeftSeconds}`;
  useEffect(() => {
    const interval = setInterval(() =>
      setTimeLeftMs(Date.parse(data!.lastEmailVerificationSentDate) - Date.now() + 60000),
    );
    return () => clearInterval(interval);
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen text-center">
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
        className="
          bg-primary
          text-white
          font-quicksand
          font-bold
          px-3
          py-2
          rounded
          mt-3
          active:bg-primary-darker
          disabled:bg-gray-300
          disabled:cursor-default
        "
        disabled={timeLeftMs > 0}
        onClick={resendEmail}
      >
        Resend
        {timeLeftMs > 0 && ` in ${timeLeftMin}:${timeLeftSecondsLeadingZero}`}
      </button>
    </main>
  );
};
export default EmailUnverified;
