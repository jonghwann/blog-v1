import z from 'zod';
import { ERROR_MESSAGES } from '@/constants/error-messages';
import { PASSWORD_REGEX } from '@/constants/regex';

export const loginSchema = z.object({
  email: z.string().email({ message: ERROR_MESSAGES.email.invalid }),
  password: z.string().regex(PASSWORD_REGEX, { message: ERROR_MESSAGES.password.invalid }),
});
