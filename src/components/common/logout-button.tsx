'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '@/api/auth/api';
import useSession from '@/hooks/use-session';
import Button from './button';

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLogin } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      router.replace('/posts');
    },
  });

  if (!isLogin) return null;

  return (
    <Button isLoading={isPending} onClick={() => mutate()}>
      Logout
    </Button>
  );
}
