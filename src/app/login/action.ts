'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';

import { findUserByEmail } from '@/lib/db/login';
import getSession from '@/lib/session';

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export async function loginAction(_prevState: unknown, formData: FormData) {
  const data = { email: formData.get('email')?.toString() ?? '', password: formData.get('password')?.toString() ?? '' };
  const result = await loginSchema.spa(data);

  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors, values: data };
  } else {
    const user = await findUserByEmail(data.email);

    if (!user) {
      return { fieldErrors: { email: ['No account found with this email.'] }, values: data };
    } else {
      const ok = await bcrypt.compare(data.password, user.password);

      if (!ok) {
        return { fieldErrors: { password: ['Incorrect password.'] }, values: data };
      } else {
        const session = await getSession();
        session.id = user.id;
        await session.save();
        return { success: true };
      }
    }
  }
}
