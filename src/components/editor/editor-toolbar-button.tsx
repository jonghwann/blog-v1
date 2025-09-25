import { cn } from '@/lib/utils';

interface EditorToolbarButtonProps {
  Icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

export default function EditorToolbarButton({ Icon, isActive, onClick, className, iconClassName }: EditorToolbarButtonProps) {
  return (
    <button type='button' onClick={onClick} className={cn('cursor-pointer', className)}>
      <Icon className={cn('size-4 text-tertiary-foreground hover:text-foreground', isActive && 'text-foreground', iconClassName)} />
    </button>
  );
}
