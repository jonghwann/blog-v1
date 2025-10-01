import type { IconType } from 'react-icons/lib';
import { cn } from '@/lib/utils';

interface IconProps {
  Icon: IconType;
  onClick?: () => void;
  className?: string;
}

export default function Icon({ Icon, onClick, className }: IconProps) {
  return <Icon onClick={onClick} className={cn('size-5 text-tertiary-foreground hover:text-foreground', className)} />;
}
