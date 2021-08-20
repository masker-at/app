import clsx from 'clsx';
import { FC, memo, useEffect, useState } from 'react';
import useRenameAlias from '../../api-hooks/useRenameAlias';
import { Alias as AliasType } from '../../utils/api/aliases';

export interface Props {
  alias: AliasType;
}

const Alias: FC<Props> = ({ alias }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(alias.name);
  useEffect(() => setName(alias.name), [alias.name]);

  const { mutate } = useRenameAlias();

  return (
    <div className="rounded border border-primary bg-gray-100 p-2 mb-3">
      {isEditing ? (
        <div>
          <input
            className="rounded border border-gray-400 focus:border-primary outline-none px-1"
            type="text"
            aria-label="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <button
            type="button"
            className="text-primary-darker text-sm mx-2"
            onClick={() => {
              mutate({ id: alias.id, updateObject: { name } });
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="text-red-600 text-sm"
            onClick={() => {
              setIsEditing(false);
              setName(alias.name);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="mb-0.5">
          <span>Name: </span>
          <span
            className={clsx({
              'italic text-gray-500': !alias.name,
              'font-semibold': !!alias.name,
            })}
          >
            {alias.name || '<Unnamed>'}
          </span>{' '}
          <button
            type="button"
            className="text-primary-darker underline text-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </p>
      )}
      <a className="font-quicksand text-primary-darker" href={`mailto:${alias.address}`}>
        {alias.address}
      </a>
    </div>
  );
};
export default memo(Alias);
