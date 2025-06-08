'use server';

import { redirect } from 'next/navigation';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import getSession from '@/lib/session';

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해 주세요.' })
    .email({ message: '올바른 이메일 주소를 입력해 주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해 주세요.' }),
});

export async function loginAction(_prevState: unknown, formData: FormData) {
  const data = { email: formData.get('email')?.toString() ?? '', password: formData.get('password')?.toString() ?? '' };
  const result = await loginSchema.spa(data);

  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors, values: data };
  } else {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      return { fieldErrors: { email: ['이메일 주소가 존재하지 않습니다.'] }, values: data };
    } else {
      const ok = await bcrypt.compare(data.password, user.password);

      if (!ok) {
        return { fieldErrors: { password: ['비밀번호가 일치하지 않습니다.'] }, values: data };
      } else {
        const session = await getSession();
        session.id = user.id;
        await session.save();
        redirect('/posts');
      }
    }
  }
}
