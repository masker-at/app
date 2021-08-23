import { FC } from 'react';
import Input from '../Input';

const PasswordChangeForm: FC = () => {
  return (
    <>
      <h1 className="text-2xl font-quicksand">Password</h1>
      <p className="text-sm mt-1 mb-2">You can change the password of your account here</p>
      <form className="flex flex-col w-64 items-stretch">
        <Input placeholder="Current password..." aria-label="Current password" />
        <div aria-hidden className="h-2" />
        <Input placeholder="New password..." aria-label="New password" />
        <div aria-hidden className="h-2" />
        <Input placeholder="Repeat new password..." aria-label="Repeat new password" />
        <button type="submit" className="button bg-primary active:bg-primary-darker mt-2">
          Save
        </button>
      </form>
    </>
  );
};
export default PasswordChangeForm;
