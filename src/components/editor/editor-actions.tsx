'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import Alert from '../common/alert';

interface EditorActionsProps {
  className?: string;
  alertDescription?: string;
  actionText?: string;
}

export default function EditorActions({
  className,
  alertDescription = 'Are you sure you want to publish?',
  actionText = 'Publish',
}: EditorActionsProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <div className={cn('flex gap-2 text-sm *:cursor-pointer', className)}>
      <button
        className="hover:text-foreground text-secondary-foreground"
        type="button"
        onClick={() => setIsAlertOpen(true)}
      >
        {actionText}
      </button>

      <Alert
        open={isAlertOpen}
        description={alertDescription}
        onCancel={() => setIsAlertOpen(false)}
        actionText={actionText}
      />
    </div>
  );
}
