'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '@/api/auth/api';
import useSession from '@/hooks/use-session';

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLogin } = useSession();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/posts');
    },
  });

  if (!isLogin) return null;

  return <LogOut className='size-5 cursor-pointer text-secondary-foreground hover:text-foreground' onClick={() => mutate()} />;
}
