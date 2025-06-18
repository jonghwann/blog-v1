'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function postIdsAction(): Promise<number[]> {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return posts.map((post) => post.id);
}
