import clsx from 'clsx';
import { FC, memo, useEffect, useRef, useState } from 'react';
import useDeleteAlias from '../../api-hooks/useDeleteAlias';
import useFinishAliasCreation from '../../api-hooks/useFinishAliasCreation';
import useUpdateAlias from '../../api-hooks/useUpdateAlias';
import { Alias as AliasType } from '../../utils/api/aliases';
import Switch from './Switch';

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

  const { mutate: updateAlias } = useUpdateAlias();
  const { mutate: deleteAlias } = useDeleteAlias();

  const finishAliasCreation = useFinishAliasCreation();

  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="rounded border border-primary bg-gray-100 p-2 mb-3 flex justify-between items-center">
      <div>
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
                  updateAlias({ id: alias.id, updateObject: { name } });
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
        <span className="font-quicksand text-gray-600">{alias.address}</span>{' '}
        <button
          type="button"
          className="text-primary-darker underline"
          onClick={async () => {
            await navigator.clipboard.writeText(alias.address);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="flex">
        <Switch
          label="Active"
          onChange={(isActive) => updateAlias({ id: alias.id, updateObject: { isActive } })}
          value={alias.isActive}
          id={`toggle-${alias.id}`}
        />
        <button
          type="button"
          className="bg-red-700 font-quicksand text-white rounded px-2 py-1 ml-2"
          onClick={() => deleteAlias({ id: alias.id })}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default memo(Alias);
