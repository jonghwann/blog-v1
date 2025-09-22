import { cn } from '@/lib/utils';

interface PostContentProps {
  className?: string;
  html: string;
}

export default function PostContent({ className, html }: PostContentProps) {
  return <article className={cn('editor', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
