import { cn } from '@/lib/utils';

interface EditorToolbarButtonProps {
  className?: string;
  iconClassName?: string;
  Icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  onClick: () => void;
}

export default function EditorToolbarButton({
  className,
  iconClassName,
  Icon,
  disabled,
  onClick,
}: EditorToolbarButtonProps) {
  return (
    <button className={cn('cursor-pointer', className)} type="button" onClick={onClick}>
      <Icon className={cn('size-4', disabled && 'text-secondary-foreground', iconClassName)} />
    </button>
  );
}
