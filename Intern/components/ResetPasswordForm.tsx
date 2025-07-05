"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { useRouter } from 'next/navigation';

const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  console.log(email, token);

  const router = useRouter();
  const { control, handleSubmit } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
    }
  }, [token]);

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/auth/reset-password', {
        email,
        token,
        newPassword: data.password
      });
      toast.success(response.data.message || "Password has been reset successfully.", {
        position: "bottom-right",
      });
      toast.info('You will be redirected to the forgot password page in 5 seconds', {
        position: "bottom-center",
        autoClose: 3000,
      });
      // Optionally redirect to sign-in page after successful reset
      setTimeout(() => {
        router.push('/signin');
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage = axiosError.response?.data?.message || 'An error occurred while resetting the password';
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 2000
        });
      } else {
        toast.error('An unexpected error occurred', {
          position: "bottom-right",
          autoClose: 2000
        });
      }

      toast.info('You will be redirected to the forgot password page in 5 seconds', {
        position: "bottom-center",
        autoClose: 5000,
      });

      setTimeout(() => {
        router.push('/forgot-password');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return <div>Invalid or expired token. Please request a new password reset link.</div>;
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">New Password</Label>
              <Input {...field} type="password" required />
              {error && <span className="text-red-500 text-sm">{error.message}</span>}
            </LabelInputContainer>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input {...field} type="password" required />
              {error && <span className="text-red-500 text-sm">{error.message}</span>}
            </LabelInputContainer>
          )}
        />
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
          <BottomGradient />
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};