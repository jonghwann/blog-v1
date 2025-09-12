'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { logout } from '@/api/auth/api';
import useSession from '@/hooks/use-session';
import Icon from './icon';

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

  return <Icon Icon={FaSignOutAlt} onClick={() => mutate()} />;
}
