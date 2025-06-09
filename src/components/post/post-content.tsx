import { cn } from '@/lib/utils';

interface PostContentProps {
  className?: string;
  html: string;
}

export default function PostContent({ className, html }: PostContentProps) {
  return <div className={cn('tiptap', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
