import ky from 'ky';
import { refresh } from './auth/api';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  retry: 1,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const data = await response.clone().json();
          if (data.code === 2002) {
            try {
              await refresh();
              return api(request, options);
            } catch {
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
            }
          }
        }
      },
    ],
  },
});
