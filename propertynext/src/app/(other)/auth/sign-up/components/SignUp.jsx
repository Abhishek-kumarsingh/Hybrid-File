'use client';

import logoDark from '@/assets/images/logo-dark.png';
import LogoLight from '@/assets/images/logo-light.png';
import TextFormInput from '@/components/form/TextFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('authentication-bg');
    return () => {
      document.body.classList.remove('authentication-bg');
    };
  }, []);

  const messageSchema = yup.object({
    name: yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Please enter your name'),
    email: yup.string()
      .email('Please enter a valid email')
      .required('Please enter your email'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Password must contain uppercase, lowercase, number and special character'
      )
      .required('Please enter your password'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    acceptTerms: yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(messageSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: 'CUSTOMER'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Please check your email for verification.');
        toast.success('Account created successfully!');

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 2000);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={5}>
            <Card className="auth-card">
              <CardBody className="px-3 py-5">
                <div className="mx-auto mb-4 text-center auth-logo">
                  <Link href="/dashboards/analytics" className="logo-dark">
                    <Image src={logoDark} height={32} alt="logo dark" />
                  </Link>
                  <Link href="/dashboards/analytics" className="logo-light">
                    <Image src={LogoLight} height={28} alt="logo light" />
                  </Link>
                </div>
                <h2 className="fw-bold text-uppercase text-center fs-18">Free Account</h2>
                <p className="text-muted text-center mt-1 mb-4">New to our platform? Sign up now! It only takes a minute.</p>

                {error && (
                  <Alert variant="danger" className="mx-4 mb-3">
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="mx-4 mb-3">
                    {success}
                  </Alert>
                )}

                <div className="px-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="authentication-form">
                    <div className="mb-3">
                      <TextFormInput
                        control={control}
                        name="name"
                        placeholder="Enter your full name"
                        className="bg-light bg-opacity-50 border-light py-2"
                        label="Full Name"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <TextFormInput
                        control={control}
                        name="email"
                        placeholder="Enter your email address"
                        className="bg-light bg-opacity-50 border-light py-2"
                        label="Email Address"
                        type="email"
                      />
                    </div>
                    <div className="mb-3">
                      <TextFormInput
                        control={control}
                        name="password"
                        placeholder="Enter your password"
                        className="bg-light bg-opacity-50 border-light py-2"
                        label="Password"
                        type="password"
                      />
                      <small className="text-muted">
                        Password must contain uppercase, lowercase, number and special character
                      </small>
                    </div>
                    <div className="mb-3">
                      <TextFormInput
                        control={control}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        className="bg-light bg-opacity-50 border-light py-2"
                        label="Confirm Password"
                        type="password"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="checkbox-signin"
                          {...register('acceptTerms')}
                        />
                        <label className="form-check-label" htmlFor="checkbox-signin">
                          I accept <Link href="/terms" className="text-primary">Terms and Conditions</Link>
                        </label>
                        {errors.acceptTerms && (
                          <div className="text-danger small mt-1">
                            {errors.acceptTerms.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-1 text-center d-grid">
                      <button
                        className="btn btn-danger py-2"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Creating Account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>
                  </form>
                  <p className="mt-3 fw-semibold no-span">OR sign with</p>
                  <div className="text-center">
                    <Button variant="outline-light" className="shadow-none">
                      <IconifyIcon icon="bxl:google" className="fs-20" />
                    </Button>
                    &nbsp;
                    <Button variant="outline-light" className="shadow-none">
                      <IconifyIcon icon="ri:facebook-fill" height={32} width={20} className="" />
                    </Button>
                    &nbsp;
                    <Button variant="outline-light" className="shadow-none">
                      <IconifyIcon icon="bxl:github" className="fs-20" />
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
            <p className="mb-0 text-center text-white">
              I already have an account{' '}
              <Link href="/auth/sign-in" className="text-reset text-unline-dashed fw-bold ms-1">
                Sign In
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>;
};
export default SignUp;