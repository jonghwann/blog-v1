'use client';

import { cn } from '@/lib/utils';

interface EditorAction {
  type?: 'button' | 'submit';
  text: string;
  onClick: () => void;
}

interface EditorActionsProps {
  className?: string;
  actions: EditorAction[];
}

export default function EditorActions({ className, actions }: EditorActionsProps) {
  return (
    <div className={cn('flex gap-2 text-sm *:cursor-pointer', className)}>
      {actions.map(({ type = 'button', text, onClick }) => {
        return (
          <button
            className="hover:text-foreground text-secondary-foreground transition-colors duration-200 ease-in-out"
            key={text}
            type={type}
            onClick={onClick}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}
