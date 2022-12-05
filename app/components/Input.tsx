import { type ChangeEvent } from 'react';

interface InputProps {
  onChange?: (arg0: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  props: any;
}
export default function Input({
  onChange,
  type = 'text',
  ...props
}: InputProps) {
  return (
    <input
      onChange={onChange}
      className='rounded-l-xl text-xl p-4 bg-violet-50 w-96 outline-violet-500'
      type={type}
      {...props}
    />
  );
}
