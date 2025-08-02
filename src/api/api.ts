import ky from 'ky';
import { useAuthStore } from '@/store/auth';
import { refresh } from './auth/auth';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const data = await response.clone().json();
          if (data.code === 2004 || data.code === 2005) {
            try {
              const response = await refresh();
              if (response.code === 1) return api(request, options);
            } catch (_error) {
              if (typeof window !== 'undefined') {
                useAuthStore.getState().setLogout();
                window.location.href = '/posts';
              }
            }
          }
        }
      },
    ],
  },
});
