import clsx from 'clsx';
import { FC } from 'react';
import { useQuery } from 'react-query';
import me from '../../utils/api/me';
import TwoFactorDisabled from './TwoFactorDisabled';
import TwoFactorEnabled from './TwoFactorEnabled';

const TwoFactor: FC = () => {
  const { data: meData } = useQuery('me', () => me());
  const { is2FAEnabled } = meData!;

  return (
    <>
      <h1 className="text-2xl font-quicksand">
        Two-factor authentication:
        <span className={clsx({ 'text-green-600': is2FAEnabled, 'text-red-600': !is2FAEnabled })}>
          {is2FAEnabled ? ' enabled' : ' disabled'}
        </span>
      </h1>
      {is2FAEnabled ? <TwoFactorEnabled /> : <TwoFactorDisabled />}
    </>
  );
};
export default TwoFactor;
