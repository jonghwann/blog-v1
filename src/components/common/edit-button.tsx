'use client';

import Link from 'next/link';

import { useAuthStore } from '@/store/auth';

interface EditButtonProps {
  id: number;
}

export default function EditButton({ id }: EditButtonProps) {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    isLogin && (
      <Link
        className="text-secondary-foreground hover:text-foreground text-sm transition-colors duration-200 ease-in-out"
        href={`/posts/edit/${id}`}
      >
        edit
      </Link>
    )
  );
}
