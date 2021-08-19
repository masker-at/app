import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import me from '../../utils/api/me';

const Header: FC = () => {
  const { data } = useQuery('me', () => me());

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.addEventListener('click', ({ target }) => {
      if (!(target instanceof HTMLElement) || target.id !== 'menu-toggle') {
        setIsMenuOpen(false);
      }
    });
  }, []);

  return (
    <header className="my-10 flex flex-wrap justify-between">
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
              <button type="button" className="mx-3 my-1 text-left">
                My Aliases
              </button>
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
                Account Settings
              </button>
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
