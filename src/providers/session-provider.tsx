import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getMe } from '@/api/auth/auth-server';

interface SessionProviderProps {
  children: React.ReactNode;
}

export default async function SessionProvider({ children }: SessionProviderProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['me'], queryFn: getMe });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
