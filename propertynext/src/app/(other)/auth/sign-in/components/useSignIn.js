'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import useQueryParams from '@/hooks/useQueryParams';
import { signIn } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { showNotification } = useNotificationContext();
  const queryParams = useQueryParams();

  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'Test@1234',
    },
  });

  const getDeviceInfo = async () => {
    const deviceId = localStorage.getItem('deviceId') || uuidv4();
    if (!localStorage.getItem('deviceId')) {
      localStorage.setItem('deviceId', deviceId);
    }

    const deviceName = navigator.userAgent;

    let ipAddress = 'unknown';
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      ipAddress = data.ip;
    } catch (error) {
      console.error('Failed to fetch IP:', error);
    }

    return {
      deviceId,
      deviceName,
      ipAddress,
    };
  };

  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const deviceInfo = await getDeviceInfo();

      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        deviceInfo: JSON.stringify(deviceInfo),
      });

      if (result?.error) {
        showNotification({
          message: result.error || 'Invalid email or password.',
          variant: 'danger',
        });
      } else {
        showNotification({
          message: 'Successfully logged in. Redirecting...',
          variant: 'success',
        });

        push(queryParams['redirectTo'] ?? '/dashboards/property');
      }
    } catch (error) {
      showNotification({
        message: 'Something went wrong. Please try again.',
        variant: 'danger',
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    loading,
    login,
    control,
  };
};

export default useSignIn;
