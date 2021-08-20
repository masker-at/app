import clsx from 'clsx';
import { FC, memo, useEffect, useRef, useState } from 'react';
import useFinishAliasCreation from '../../api-hooks/useFinishAliasCreation';
import useRenameAlias from '../../api-hooks/useRenameAlias';
import { Alias as AliasType } from '../../utils/api/aliases';

export interface Props {
  alias: AliasType;
}

const Alias: FC<Props> = ({ alias }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (alias.isNew) {
      inputRef.current?.focus();
    }
  }, [alias.isNew]);

  const [name, setName] = useState(alias.name);
  useEffect(() => setName(alias.name), [alias.name]);

  const { mutate } = useRenameAlias();

  const finishAliasCreation = useFinishAliasCreation();

  return (
    <div className="rounded border border-primary bg-gray-100 p-2 mb-3">
      {isEditing || alias.isNew ? (
        <div>
          <input
            className="rounded border border-gray-400 focus:border-primary outline-none px-1"
            type="text"
            aria-label="Name (optional)"
            placeholder="Name (optional)"
            value={name}
            onChange={({ target }) => setName(target.value)}
            ref={inputRef}
          />
          <button
            type="button"
            className="text-primary-darker text-sm mx-2"
            onClick={() => {
              if (name !== alias.name) {
                mutate({ id: alias.id, updateObject: { name } });
              }
              setIsEditing(false);
              if (alias.isNew) {
                finishAliasCreation(alias.id);
              }
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="text-red-600 text-sm"
            onClick={() => {
              setName(alias.name);
              setIsEditing(false);
              if (alias.isNew) {
                finishAliasCreation(alias.id);
              }
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
