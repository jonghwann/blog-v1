import { User } from '@prisma/client';

import prisma from '@/db/client';

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error in findUserByEmail:', error);
    throw new Error('Failed to find user by email');
  }
}
