"use client";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInSchema } from '@/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from 'next/link';

export function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log("Error")
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    })
    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error("Incorrect username or password", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(result.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }

    if (result?.url) {
      router.replace('/');
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Login for DDA
      </h2>
      <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="identifier">Email/UserName</Label>
              <Input {...field} required />
            </LabelInputContainer>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input placeholder="Password" type="password" required {...field} />
            </LabelInputContainer>
          )}
        />
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>
        <ToastContainer />
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="text-center mt-4">
          <p>
            Forgot Password?{' '}
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Forgot Password
            </Link>
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" // Changed to button to avoid conflict with form submit
            onClick={() => signIn("google")} // Add your Google sign-in logic here
          >
            <IconBrandGoogleFilled className="h-4 w-4 text-neutral-300 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>

        <ToastContainer />
      </form>
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

export default SignInForm;
