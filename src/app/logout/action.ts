'use server';

import getSession from '@/lib/session';

interface LogoutActionState {
  success: boolean;
}

export async function logoutAction(): Promise<LogoutActionState> {
  try {
    const session = await getSession();
    session.destroy();
    return { success: true };
  } catch (error) {
    console.error('Error in logoutAction:', error);
    return { success: false };
  }
}
