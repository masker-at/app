import { FC } from 'react';

const Sidebar: FC = () => (
  <aside className="font-quicksand flex-shrink-0 w-44 pr-5 border-r border-gray-200">
    <ul>
      <li className="my-1 rounded px-3 py-1 bg-primary bg-opacity-25 text-primary-darker font-bold">
        My Aliases
      </li>
      <li className="my-1 rounded px-3 py-1">Account Settings</li>
    </ul>
  </aside>
);
export default Sidebar;
