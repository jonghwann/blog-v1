'use server';

import getSession from '@/lib/session';

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
}
