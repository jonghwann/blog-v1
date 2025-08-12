import ky, { HTTPError } from 'ky';
import { toast } from 'sonner';
import { refresh } from './auth/api';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const data = await response.clone().json();
          if (data.code === 2002) {
            try {
              await refresh();
              return api(request, options);
            } catch (error) {
              if (typeof window !== 'undefined') {
                if (error instanceof HTTPError) {
                  const data = await error.response.json();
                  toast.error(data.message);
                  window.location.href = '/posts';
                } else {
                  console.error(error);
                }
              }
            }
          }
        }
      },
    ],
  },
});
