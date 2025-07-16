import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useAuthStore } from '@/store/auth';

export function useSessionSync() {
  const { isLogin, setLogin, setLogout } = useAuthStore(
    useShallow((state) => ({ isLogin: state.isLogin, setLogin: state.setLogin, setLogout: state.setLogout })),
  );

  const checkSession = async () => {
    const response = await fetch('/api/session');
    const data = await response.json();

    if (data.isLogin && !isLogin) {
      setLogin();
    } else if (!data.isLogin && isLogin) {
      setLogout();
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
}
