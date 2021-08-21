import { ChangeEventHandler, FC, useCallback } from 'react';

export interface Props {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

const Switch: FC<Props> = ({ id, value, onChange, label }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => onChange(event.target.checked),
    [onChange],
  );
  return (
    <>
      <style jsx>{`
        input + label > div > div {
          --tw-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
        }

        input:checked + label > div {
          background-color: #62bea8;
        }

        input:checked + label > div > div {
          --tw-translate-x: 1.125rem;
        }
      `}</style>
      <input
        type="checkbox"
        id={id}
        checked={value}
        className="sr-only"
        onChange={handleChange}
        aria-label={label}
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="bg-gray-300 w-10 h-5 rounded-full mx-2 duration-300 ease-in-out">
          <div
            className={`
              bg-white
              w-6
              h-6
              rounded-full
              shadow-md
              transform
              -translate-x-0.5
              -translate-y-0.5
              duration-300
              ease-in-out
            `}
          />
        </div>
      </label>
    </>
  );
};
export default Switch;
