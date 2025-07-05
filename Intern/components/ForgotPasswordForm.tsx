"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ApiResponse = {
  message: string;
};

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/auth/forgot-password', data);

      toast.success(response.data.message || "Password reset link has been sent to your email.", {
        position: "bottom-right",
      });
      setTimeout(() => {
        router.push('/signin');
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage = axiosError.response?.data?.message || 'Failed to send reset email';
        toast.error(errorMessage, {
          position: "bottom-right",
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "bottom-right",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-4">
        Forgot Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input {...field} type="email" required />
              {error && <span className="text-red-500 text-sm">{error.message}</span>}
            </LabelInputContainer>
          )}
        />
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Reset Password'}
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

export default ForgotPasswordForm;