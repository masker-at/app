import { FC } from 'react';

const Sidebar: FC = () => (
  <aside className="font-quicksand flex-shrink-0 w-44 pr-5 border-r border-gray-200">
    <ul>
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
