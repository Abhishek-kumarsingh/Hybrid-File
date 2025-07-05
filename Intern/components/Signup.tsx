"use client";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUpSchema } from '@/schemas/signUpSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react';
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useDebounceCallback } from 'usehooks-ts';
import Link from 'next/link';

export function Signup() {
    const [username, setUsername] = useState('')
    const [usernameMessage, setEmailMessage] = useState('')
    const [isCheckingUsername, setisCheckingEmail] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const debounced = useDebounceCallback(setUsername, 500)
    const router = useRouter()

    // zod implementation

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    useEffect(() => {
        const checkEmailUnique = async () => {
            if (username) {
                setisCheckingEmail(true)
                setEmailMessage('')
                try {
                    const response = await axios.get(`/api/checkusernameunique?username=${username}`)
                    setEmailMessage(response.data.message)
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setEmailMessage(axiosError.response?.data.message ?? "Error Checking username")
                }
                finally {
                    setisCheckingEmail(false)
                }
            }
        }
        checkEmailUnique()
    }
        , [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/auth/signup', data)
            toast.success(response.data.message, {
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
            router.replace(`/verify/${username}`)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? "Error Signing Up", {
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
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Sign Up for DDA
            </h2>
            <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
                <Controller
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <LabelInputContainer>
                            <Label htmlFor="username">Uername</Label>
                            <Input
                                placeholder="Enter Your Username"
                                required
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                    debounced(e.target.value);
                                }}
                            />
                            {isCheckingUsername && <Loader2 className="animate-spin" />}
                            {!isCheckingUsername && usernameMessage && (
                                <p
                                    className={`text-sm ${usernameMessage === 'Username is unique'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                        }`}
                                >
                                    {usernameMessage}
                                </p>
                            )}
                        </LabelInputContainer>
                    )}
                />
                <Controller
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <LabelInputContainer>
                            <Label htmlFor="email">Email</Label>
                            <Input placeholder="Enter Your Email" type="email" required {...field} />
                        </LabelInputContainer>
                    )}
                />
                <Controller
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <LabelInputContainer>
                            <Label htmlFor="password">Password</Label>
                            <Input placeholder="Password" type="password" required {...field} />
                        </LabelInputContainer>
                    )}
                />
                <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <LabelInputContainer>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input placeholder="Confirm Password" type="password" required {...field} />
                        </LabelInputContainer>
                    )}
                />
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit" disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        'Sign Up'
                    )}
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="button" // Changed to button to avoid conflict with form submit
                        onClick={() => console.log('Sign in with Google')} // Add your Google sign-in logic here
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
                        Already a member?{' '}
                        <Link href="/signin" className="text-blue-600 hover:text-blue-800">
                            Sign in
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

export default Signup;
