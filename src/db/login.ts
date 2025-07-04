import { User } from '@prisma/client';

import prisma from '@/db/client';

export async function findUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { email } });
}
