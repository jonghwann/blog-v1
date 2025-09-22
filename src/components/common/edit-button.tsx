'use client';
import Link from 'next/link';
import useSession from '@/hooks/use-session';

interface EditButtonProps {
  id: number;
}

export default function EditButton({ id }: EditButtonProps) {
  const { isLogin } = useSession();

  return (
    isLogin && (
      <Link className='text-sm text-tertiary-foreground hover:text-foreground' href={`/posts/edit/${id}`}>
        edit
      </Link>
    )
  );
}
