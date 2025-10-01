'use client';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/auth/api';

export default function useSession() {
  const { data } = useQuery({ queryKey: ['me'], queryFn: getMe, staleTime: Infinity, gcTime: Infinity });
  return { isLogin: data?.isLogin, user: data?.user };
}
