"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";
    const user = session?.user || null;

    const logout = async () => {
        await signOut({ redirect: false });
        router.push("/auth/sign-in");
        router.refresh();
    };

    const hasRole = (requiredRoles) => {
        if (!user) return false;

        if (Array.isArray(requiredRoles)) {
            return requiredRoles.includes(user.role);
        }

        return user.role === requiredRoles;
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        logout,
        hasRole,
    };
}
