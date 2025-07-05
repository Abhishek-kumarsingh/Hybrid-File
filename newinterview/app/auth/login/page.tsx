"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Correct import from next-auth/react
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast"; // Ensure this is correctly set up
// import { FcGoogle } from "react-icons/fc"; // Example: Using react-icons for Google icon
// Or keep your Lucide icon: import { ToggleLeft as GoogleIcon, Loader2 } from 'lucide-react';
import { Loader2, KeyRound } from "lucide-react"; // Using KeyRound as a generic auth icon from Lucide

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Renamed for clarity (isLoading vs loading)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // Separate loading state for Google

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting credentials login with:", {
        email,
        password: "***",
      });
      const result = await signIn("credentials", {
        redirect: false, // Handle redirect manually
        email,
        password,
      });
      console.log("Credentials SignIn result:", result);

      if (result?.error) {
        const errorMessage =
          result.error === "CredentialsSignin"
            ? "Invalid email or password. Please try again."
            : `Login failed: ${result.error}`;
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (result?.ok && !result?.error) {
        toast({
          title: "Login Successful!",
          description: "Redirecting to your dashboard...",
          className: "bg-green-500 text-white", // Example custom success toast
        });
        router.push("/dashboard"); // Or result.url if provided and preferred
        router.refresh(); // Refresh server components and data fetching
      } else {
        // Catch any other unexpected scenario from signIn
        toast({
          title: "Login Issue",
          description:
            "An unexpected issue occurred during login. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      // Catch network errors or other exceptions
      console.error("Unhandled login error:", error);
      toast({
        title: "Login Error",
        description:
          error.message ||
          "An unexpected error occurred. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // The development mode check can stay if you prefer, or be removed if OAuth works locally
      // if (process.env.NODE_ENV === 'development') {
      //   toast({
      //     title: "Dev Mode",
      //     description: "Google login can be tested. Using email/password is also an option.",
      //   });
      //   // Simulate a delay then stop loading, or proceed with actual signIn
      //   // For actual testing, you'd want to remove this block or make it conditional
      //   // For now, let's assume we attempt Google Sign In always.
      // }

      await signIn("google", {
        callbackUrl: "/dashboard", // Ensure this callback URL is registered in your Google Cloud Console
        // redirect: true, // signIn with redirect: true doesn't return, it navigates.
        // If you need to handle errors here, set redirect: false and manage router.push
      });
      // If redirect: true, this part below won't be reached on success.
      // If redirect: false, you'd check the result similar to credentials.
    } catch (error: any) {
      // Catches errors if signIn itself throws before redirecting
      console.error("Google login initiation error:", error);
      toast({
        title: "Google Sign-In Error",
        description:
          error.message || "Could not start Google sign-in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false); // This might not be hit if redirect: true succeeds.
      // For redirect: true, loading state handled by page navigation.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md shadow-xl dark:bg-slate-850">
        {" "}
        {/* Dark mode bg adjustment */}
        <CardHeader className="space-y-1 text-center">
          {/* Optional: Add a logo here */}
          {/* <img src="/logo.png" alt="Company Logo" className="w-20 h-20 mx-auto mb-2" /> */}
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome Back!
          </CardTitle>
          <CardDescription>
            Sign in to access your interview dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {" "}
          {/* Added pt-6 */}
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full text-sm font-medium"
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              // Option 1: Using react-icons (install `react-icons` first: npm install react-icons)
              <span className="mr-2 h-5 w-5" />
              // Option 2: Using a generic Lucide icon if you prefer to stick with it
              // <KeyRound className="mr-2 h-4 w-4" />
            )}
            Sign in with Google
          </Button>
          <div className="relative my-6">
            {" "}
            {/* Increased margin */}
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t dark:border-slate-700" />{" "}
              {/* Dark mode border */}
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground dark:bg-slate-850">
                {" "}
                {/* Dark mode bg */}
                Or continue with email
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isGoogleLoading}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password" // Ensure this route exists
                  className="text-xs text-primary hover:underline"
                  tabIndex={-1} // Optional: remove from tab order if not primary
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isGoogleLoading}
                required
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3 pt-6">
          {" "}
          {/* Added pt-6 */}
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Sign up now
            </Link>
          </p>
          {/* The Admin Login link might be better placed in a footer or a different section
              if it's a distinct user flow, or remove if not generally applicable. */}
          {/* <p className="text-xs text-muted-foreground">
            <Link href="/admin" className="hover:underline">
              Admin Access
            </Link>
          </p> */}
        </CardFooter>
      </Card>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Your Interview App. All rights reserved.
        {/* <br /> */}
        {/* <Link href="/privacy" className="hover:underline">Privacy Policy</Link> · <Link href="/terms" className="hover:underline">Terms of Service</Link> */}
      </p>
    </div>
  );
}
