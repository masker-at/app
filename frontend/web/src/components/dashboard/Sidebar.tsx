import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Sidebar: FC = () => {
  const router = useRouter();
  const isDashboard = router.pathname.includes('/dashboard');
  const isSettings = router.pathname.includes('/settings');
  const isBilling = router.pathname.includes('/billing');

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
      </ul>
    </aside>
  );
};
export default Sidebar;
