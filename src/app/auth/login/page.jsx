'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import CustomButton from '@/app/components/InputAndButton/CustomButton';
import CustomInput from '@/app/components/InputAndButton/CustomInput';
import { db } from '@/app/firebase';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setErrorMessage('');
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(db, values.email, values.password);
        const user = userCredential.user;
        if (user.emailVerified) {
          router.push('/'); // Redirect to homepage
        } else {
          setErrorMessage('Please verify your email first.');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login to your account</h2>

        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            placeholder="Enter your email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <CustomInput
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div className="flex justify-between text-sm mb-4">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-orange-500" /> Remember me
            </label>
            <a href="#!" className="text-orange-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <CustomButton
            type="submit"
            text={loading ? 'Logging in...' : 'Login'}
            disabled={loading}
          />

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="text-orange-500 hover:underline"
              onClick={() => router.push('/register')}
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;