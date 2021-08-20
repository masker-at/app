import clsx from 'clsx';
import { FC } from 'react';
import { Alias as AliasType } from '../../utils/api/aliases';

export interface Props {
  alias: AliasType;
}

const Alias: FC<Props> = ({ alias }) => {
  return (
    <div className="rounded border border-primary bg-gray-100 p-2 mb-3">
      <p>
        <span>Name: </span>
        <span
          className={clsx({
            'italic text-gray-500': !alias.name,
            'font-semibold': !!alias.name,
          })}
        >
          {alias.name || '<Unnamed>'}
        </span>{' '}
        <button type="button" className="text-primary-darker underline text-sm">
          Edit
        </button>
      </p>
      <a className="font-quicksand text-primary-darker" href={`mailto:${alias.address}`}>
        {alias.address}
      </a>
    </div>
  );
};
export default Alias;
