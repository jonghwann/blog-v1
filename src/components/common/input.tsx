import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[];
}

export default function Input({ name, errors, ...rest }: InputProps) {
  return (
    <div className="flex flex-col">
      <input name={name} {...rest} className="rounded border p-2" />
      {errors?.[0] && <span className="font-medium text-red-500">{errors[0]}</span>}
    </div>
  );
}
