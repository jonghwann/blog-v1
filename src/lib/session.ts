import { cookies } from 'next/headers';

import { getIronSession } from 'iron-session';

interface IronSession {
  id?: number;
}

export default async function getSession() {
  return getIronSession<IronSession>(await cookies(), {
    cookieName: 'session',
    password: process.env.SESSION_PASSWORD!,
    cookieOptions: { maxAge: 60 * 60 * 24 * 7 },
  });
}
