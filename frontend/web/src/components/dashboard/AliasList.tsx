import { FC, useState } from 'react';
import Link from 'next/link';
import useAliasList from '../../api-hooks/useAliasList';
import useCreateAlias from '../../api-hooks/useCreateAlias';
import useMeQuery from '../../api-hooks/useMeQuery';
import Alias from './Alias';

const AliasList: FC = () => {
  const { data: aliasData } = useAliasList();
  const { data: meData } = useMeQuery();
  const { mutate } = useCreateAlias();
  const [search, setSearch] = useState('');

  const trialEnd = Date.parse(meData!.createdAt) + 7 * 24 * 3600 * 1000;
  const isTrialEndingSoon = !meData!.subscription && Date.now() + 3 * 24 * 3600 * 1000 > trialEnd;
  const isTrialEnded = !meData!.subscription && Date.now() > trialEnd;

  return (
    <main className="flex-grow sm:pl-5 xl:mr-72 flex flex-col">
      {isTrialEndingSoon && (
        <section className="flex-grow-0 flex-shrink-0 bg-yellow-400 p-5 rounded mb-3 text-yellow-900">
          Your free trial end
          {isTrialEnded ? 'ed' : 's'} on <b>{new Date(trialEnd).toLocaleDateString()}</b>.{' '}
          <Link href="/billing">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="underline">Upgrade</a>
          </Link>{' '}
          {isTrialEnded
            ? 'to continue receiving emails'
            : 'to avoid interruptions in forwarding emails'}
        </section>
      )}
      <section className="flex-grow-0 flex-shrink-0 flex justify-between items-center flex-wrap">
        <button
          type="submit"
          className="button bg-primary active:bg-primary-darker"
          onClick={() => mutate({})}
        >
          + New
        </button>

        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
          className="px-2 py-1 rounded outline-none border border-gray-400 focus:border-primary"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </section>

      <section className="flex-1 overflow-auto mt-3">
        {aliasData?.map(
          (alias) =>
            (!search || alias.name?.toLowerCase().includes(search.toLowerCase())) && (
              <Alias alias={alias} key={alias.id} />
            ),
        )}
      </section>
    </main>
  );
};
export default AliasList;
