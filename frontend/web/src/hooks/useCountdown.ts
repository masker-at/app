import { useEffect, useState } from 'react';

const useCountdown = (toUnixMs: number): string | null => {
  const [timeLeftMs, setTimeLeftMs] = useState(toUnixMs - Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeftMs(toUnixMs - Date.now()));
    return () => clearInterval(interval);
  }, [toUnixMs]);

  const timeLeftMin = Math.floor(timeLeftMs / 60000);
  const timeLeftSeconds = Math.floor((timeLeftMs - timeLeftMin * 60000) / 1000);
  const timeLeftSecondsLeadingZero = `${timeLeftSeconds < 10 ? '0' : ''}${timeLeftSeconds}`;

  return timeLeftMs >= 0 ? `${timeLeftMin}:${timeLeftSecondsLeadingZero}` : null;
};
export default useCountdown;
