'use client'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{ username: string }>()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/auth/verifycode`, {
                username: params.username,
                code: data.code
            })
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
            router.replace('/signin')

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? "Error Verifying Account", {
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

    return (
        <div className="flex justify-center items-center min-h-screen shadow-input bg-white dark:bg-black">
            <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-neutral-800 dark:text-neutral-200">
                        Verify Your Account
                    </h1>
                    <p className="mb-4">Enter the verification code sent to your email</p>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Controller
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <LabelInputContainer>
                                <Label htmlFor="code">Verification Code</Label>
                                <Input placeholder="code" {...field} />
                                <ToastContainer />
                            </LabelInputContainer>
                        )}
                    />
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Submit &rarr;
                        <BottomGradient />
                    </button>
                </form>
            </div>
        </div>
    )
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

export default VerifyAccount
