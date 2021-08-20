import { FC } from 'react';

const Sidebar: FC = () => (
  <aside className="font-quicksand flex-shrink-0 sm:w-44 sm:pr-5 sm:border-r border-gray-200 mb-3 sm:mb-0">
    <ul className="flex sm:block">
      <li className="mr-2 sm:mr-0">
        <button
          type="button"
          className="
            my-1
            rounded
            w-full
            px-3
            py-1
            text-left
            hover:bg-primary
            hover:bg-opacity-25
            hover:text-primary-darker

            bg-primary bg-opacity-25 text-primary-darker font-bold
          "
        >
          My Aliases
        </button>
      </li>
      <li>
        <button
          type="button"
          className="
            my-1
            rounded
            w-full
            px-3
            py-1
            text-left
            hover:bg-primary
            hover:bg-opacity-25
            hover:text-primary-darker
          "
        >
          Account Settings
        </button>
      </li>
    </ul>
  </aside>
);
export default Sidebar;
