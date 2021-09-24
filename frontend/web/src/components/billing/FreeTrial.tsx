import { FC } from 'react';
import useMeQuery from '../../api-hooks/useMeQuery';

const FREE_TRIAL_DURATION = 7 * 24 * 3600 * 1000;

const FreeTrial: FC = () => {
  const { data } = useMeQuery();

  const trialEndDateUnixMs = Date.parse(data!.createdAt) + FREE_TRIAL_DURATION;
  const trialEndDateString = new Date(trialEndDateUnixMs).toLocaleDateString();
  const trialDaysLeft = Math.ceil((trialEndDateUnixMs - Date.now()) / (24 * 3600 * 1000));

  return (
    <>
      {trialEndDateUnixMs > Date.now() ? (
        <p>
          Your free trial expires in <b>{trialDaysLeft}</b> day{trialDaysLeft > 1 && 's'} (on{' '}
          <b>{trialEndDateString}</b>)
        </p>
      ) : (
        <p>
          Your free trial has expired on <b>{trialEndDateString}</b>
        </p>
      )}
      <button type="button" className="text-left text-primary-darker underline">
        Upgrade{' '}
        {trialEndDateUnixMs > Date.now()
          ? 'for unlimited aliases and more!'
          : 'to continue using your account'}
      </button>
    </>
  );
};
export default FreeTrial;
