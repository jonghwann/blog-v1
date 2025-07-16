'use client';

import { useEffect } from 'react';

import Button from './button';

interface AlertProps {
  open: boolean;
  title?: string;
  description?: string;
  isLoading?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  actionText?: string;
  onAction?: () => void;
}

export default function Alert({
  open,
  title,
  description,
  isLoading,
  cancelText = 'Cancel',
  onCancel,
  actionText = 'Continue',
  onAction,
}: AlertProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-alert)] bg-black/50">
      <div className="bg-background fixed top-[50%] left-[50%] z-[var(--z-alert)] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" type="button" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button type="submit" isLoading={isLoading} onClick={onAction}>
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
}
