import ky from 'ky';
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
              await refresh();
              return api(request, options);
            } catch {
              if (typeof window !== 'undefined') {
                window.location.href = '/posts';
              }
            }
          }
        }
      },
    ],
  },
});
