import clsx from 'clsx';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

export type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: FC<Props> = (props) => (
  <input
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className={clsx(
      props.className,
      'p-2',
      'rounded',
      'outline-none',
      'border',
      'focus:border-2',
      'border-gray-400',
      'focus:border-primary',
      'font-quicksand',
      'text-sm',
      'm-px',
      'focus:m-0',
    )}
  />
);
export default Input;
