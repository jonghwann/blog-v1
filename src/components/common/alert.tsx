'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Button from './button';

interface AlertProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  onSubmit: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
}

export default function Alert({ trigger, title, description, onSubmit, open, onOpenChange, isLoading }: AlertProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>

          <Button isLoading={isLoading} onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
