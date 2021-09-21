import clsx from 'clsx';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import useMeQuery from '../../api-hooks/useMeQuery';

const Header: FC = () => {
  const { data } = useMeQuery();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.addEventListener('click', ({ target }) => {
      if (!(target instanceof HTMLElement) || target.id !== 'menu-toggle') {
        setIsMenuOpen(false);
      }
    });
  }, []);

  return (
    <header className="mt-10 mb-3 sm:mb-10 flex flex-wrap justify-between items-center">
      <img src="/img/logo.svg" alt="Masker@ logo" width="180" height="37" />

      <div className="font-quicksand relative">
        <button
          id="menu-toggle"
          className="cursor-pointer font-bold text-primary-darker"
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {data!.email} &#x25be;
        </button>

        <div
          className={clsx(
            `
              absolute
              left-0
              right-0
              mt-2
              rounded-lg
              shadow-no-offset
              bg-white
              overflow-hidden
              transition-all
            `,
            {
              'h-0': !isMenuOpen,
              'h-28': isMenuOpen,
            },
          )}
        >
          <ul className="mt-2">
            <li
              className="
                  hover:bg-primary
                  hover:bg-opacity-25
                  hover:text-primary-darker
                  flex
                  flex-col
                  items-stretch
                "
            >
              <Link href="/dashboard">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="block mx-3 my-1 text-left">My Aliases</a>
              </Link>
            </li>
            <li
              className="
                  hover:bg-primary
                  hover:bg-opacity-25
                  hover:text-primary-darker
                  flex
                  flex-col
                  items-stretch
                "
            >
              <Link href="/settings">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="block mx-3 my-1 text-left">Account Settings</a>
              </Link>
            </li>
            <li
              className="
                  hover:bg-primary
                  hover:bg-opacity-25
                  hover:text-primary-darker
                  flex
                  flex-col
                  items-stretch
                "
            >
              <button type="button" className="mx-3 my-1 text-left">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
