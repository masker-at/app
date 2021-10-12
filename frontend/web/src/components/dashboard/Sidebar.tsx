import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Bowser from 'bowser';
import useMeQuery from '../../api-hooks/useMeQuery';

const Sidebar: FC = () => {
  const router = useRouter();
  const isDashboard = router.pathname.includes('/dashboard');
  const isSettings = router.pathname.includes('/settings');
  const isBilling = router.pathname.includes('/billing');

  const { data } = useMeQuery();

  const [storeLink, setStoreLink] = useState<string | null>(null);
  useEffect(() => {
    const browserName = Bowser.getParser(navigator.userAgent).getBrowserName();
    switch (browserName) {
      case 'Opera':
        setStoreLink('https://addons.opera.com/extensions/details/masker/');
        break;
      case 'Firefox':
        setStoreLink('https://addons.mozilla.org/firefox/addon/masker/');
        break;
      case 'Chrome':
      case 'NAVER Whale Browser':
      case 'Yandex Browser':
      case 'UC Browser':
      case 'Maxthon':
      case 'Microsoft Edge':
      case 'Vivaldi':
      case 'Chromium':
      case 'Google Search':
        setStoreLink('https://masker.at'); // TODO: Change
        break;
      default:
    }
  }, []);

  return (
    <aside className="font-quicksand flex-shrink-0 sm:w-44 sm:pr-5 sm:border-r border-gray-200 mb-3 sm:mb-0">
      <ul className="flex sm:block">
        <li className="mr-2 sm:mr-0">
          <Link href="/dashboard">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className={clsx(
                `
                block
                my-1
                rounded
                w-full
                px-3
                py-1
                text-left
                hover:bg-primary
                hover:bg-opacity-25
                hover:text-primary-darker
              `,
                {
                  'bg-primary bg-opacity-25 text-primary-darker font-bold': isDashboard,
                },
              )}
            >
              My Aliases
            </a>
          </Link>
        </li>
        <li>
          <Link href="/settings">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className={clsx(
                `
                  block
                  my-1
                  rounded
                  w-full
                  px-3
                  py-1
                  text-left
                  hover:bg-primary
                  hover:bg-opacity-25
                  hover:text-primary-darker
                `,
                {
                  'bg-primary bg-opacity-25 text-primary-darker font-bold': isSettings,
                },
              )}
            >
              Account Settings
            </a>
          </Link>
        </li>
        {data!.isEmailVerified && (
          <li>
            <Link href="/billing">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className={clsx(
                  `
                    block
                    my-1
                    rounded
                    w-full
                    px-3
                    py-1
                    text-left
                    hover:bg-primary
                    hover:bg-opacity-25
                    hover:text-primary-darker
                  `,
                  {
                    'bg-primary bg-opacity-25 text-primary-darker font-bold': isBilling,
                  },
                )}
              >
                Billing
              </a>
            </Link>
          </li>
        )}
        {storeLink && (
          <li>
            <Link href={storeLink}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className={clsx(
                  `
                  block
                  my-1
                  rounded
                  w-full
                  px-3
                  py-1
                  text-left
                  text-primary-darker
                  underline
                `,
                )}
              >
                Get our extension
              </a>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};
export default Sidebar;
