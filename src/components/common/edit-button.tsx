'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getMe } from '@/api/auth/api-server';

interface EditButtonProps {
  id: number;
}

export default function EditButton({ id }: EditButtonProps) {
  const { data: me } = useQuery({ queryKey: ['me'], queryFn: getMe });

  return (
    me?.isLogin && (
      <Link
        className='text-secondary-foreground text-sm transition-colors duration-200 ease-in-out hover:text-foreground'
        href={`/posts/edit/${id}`}
      >
        edit
      </Link>
    )
  );
}
