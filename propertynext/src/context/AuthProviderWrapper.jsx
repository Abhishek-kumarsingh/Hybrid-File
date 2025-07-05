import { SessionProvider } from "next-auth/react";

export function AuthProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// Add this to your AppProviderWrapper.jsx
export function AppProvidersWrapper({ children }) {
  return (
    <AuthProviderWrapper>
      {/* Other providers */}
      {children}
    </AuthProviderWrapper>
  );
}
