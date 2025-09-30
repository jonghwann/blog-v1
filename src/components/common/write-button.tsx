'use client';
import Link from 'next/link';
import { FaPenToSquare } from 'react-icons/fa6';
import useSession from '@/hooks/use-session';
import Icon from './icon';

export default function WriteButton() {
  const { isLogin } = useSession();

  if (!isLogin) return null;

  return (
    <Link href='/posts/write'>
      <Icon Icon={FaPenToSquare} />
    </Link>
  );
}
