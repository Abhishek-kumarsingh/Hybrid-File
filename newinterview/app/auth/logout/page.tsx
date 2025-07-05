'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      await signOut({ callbackUrl: '/auth/login' });
    };
    
    performLogout();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Signing out...</h1>
        <p className="text-muted-foreground">You will be redirected shortly.</p>
      </div>
    </div>
  );
}
