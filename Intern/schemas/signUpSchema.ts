import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(5, 'Username must be at least 5 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters' }),
}).refine(({ password, confirmPassword }) => {
  return password === confirmPassword;
}, {
  message: "Passwords must match!",
  path: ["confirmPassword"],
});