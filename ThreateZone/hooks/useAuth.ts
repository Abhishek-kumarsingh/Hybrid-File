'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'analyst';
  avatar?: string;
  permissions: string[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'operator' | 'analyst';
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('auth_token');
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: 'Authentication check failed',
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        setAuthState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
        toast.success('Login successful');
        router.push('/');
        return { success: true };
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: data.message || 'Login failed',
        }));
        toast.error(data.message || 'Login failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [router]);

  const register = useCallback(async (userData: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        setAuthState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
        toast.success('Registration successful');
        router.push('/');
        return { success: true };
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: data.message || 'Registration failed',
        }));
        toast.error(data.message || 'Registration failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
      toast.success('Logged out successfully');
      router.push('/auth/login');
    }
  }, [router]);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!authState.user) return { success: false, error: 'Not authenticated' };

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthState(prev => ({
          ...prev,
          user: { ...prev.user!, ...data.user },
        }));
        toast.success('Profile updated successfully');
        return { success: true };
      } else {
        toast.error(data.message || 'Profile update failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please try again.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [authState.user]);

  const hasPermission = useCallback((permission: string) => {
    return authState.user?.permissions?.includes(permission) || false;
  }, [authState.user]);

  const hasRole = useCallback((role: string) => {
    return authState.user?.role === role;
  }, [authState.user]);

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
    hasRole,
    refreshAuth: checkAuthStatus,
  };
}
