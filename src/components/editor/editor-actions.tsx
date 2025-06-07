'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

interface EditorActionsProps {
  className?: string;
  cancelText?: string;
  submitText?: string;
}

export default function EditorActions({ className, cancelText, submitText }: EditorActionsProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={cn('flex gap-2 text-sm *:cursor-pointer', className)}>
      <button onClick={handleCancel}>{cancelText}</button>
      <button>{submitText}</button>
    </div>
  );
}
