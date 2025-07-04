'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';

import { findUserByEmail } from '@/db/login';

import getSession from '@/lib/session';

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

interface LoginAction {
  errors?: { email?: string[]; password?: string[] };
  values?: { email: string; password: string };
  success?: boolean;
}

export async function loginAction(_previousState: unknown, formData: FormData): Promise<LoginAction> {
  const data = { email: formData.get('email')?.toString() ?? '', password: formData.get('password')?.toString() ?? '' };
  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, values: data };
  } else {
    try {
      const user = await findUserByEmail(data.email);

      if (!user) {
        return { errors: { email: ['No account found with this email.'] }, values: data };
      } else {
        const isPasswordMatch = await bcrypt.compare(data.password, user.password);

        if (!isPasswordMatch) {
          return { errors: { password: ['Incorrect password.'] }, values: data };
        } else {
          const session = await getSession();
          session.id = user.id;
          await session.save();
          return { success: true };
        }
      }
    } catch (error) {
      console.error('Error in loginAction:', error);
      return { errors: { email: ['Something went wrong. Please try again later.'] }, values: data };
    }
  }
}
