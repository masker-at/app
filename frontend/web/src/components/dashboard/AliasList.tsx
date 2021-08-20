import { FC } from 'react';
import useAliasList from '../../api-hooks/useAliasList';
import Alias from './Alias';

const AliasList: FC = () => {
  const { data } = useAliasList();

  return (
    <main className="flex-grow pl-5 xl:mr-72 flex flex-col">
      <section className="flex-grow-0 flex-shrink-0 flex justify-between items-center">
        <button
          type="submit"
          className="
            bg-primary
            text-white
            font-quicksand
            font-bold
            p-2
            w-20
            rounded
            active:bg-primary-darker
          "
        >
          + New
        </button>

        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="px-2 py-1 rounded outline-none border border-gray-400 focus:border-primary"
        />
      </section>

      <section className="flex-1 overflow-auto mt-3">
        {data &&
          data.pages.map((page) =>
            page.data.map((alias) => <Alias alias={alias} key={alias.id} />),
          )}
      </section>
    </main>
  );
};
export default AliasList;
