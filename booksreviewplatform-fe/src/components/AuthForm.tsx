import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, signup } from '../services/auth.service';

interface AuthFormProps {
  formType: 'signin' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string; name?: string; username?: string }) => {
    setLoading(true);

    try {
      if (formType === 'signin') {
        await login(values.email, values.password);
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/books');
        }, 1000);
      } else {
        await signup(values.username!, values.email, values.password, values.name!);
        toast.success('Signup successful');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (e) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    ...(formType === 'signup' && {
      name: Yup.string().required('Required'),
      username: Yup.string().required('Required'),
    }),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <Formik
        initialValues={{ email: '', password: '', name: '', username: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md p-8 bg-white rounded shadow-md">
            <h3 className="mb-4 text-3xl font-bold text-center">
              {formType === 'signin' ? 'Log In to start your journey' : 'Sign Up to start your journey'}
            </h3>
            {formType === 'signup' && (
              <>
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4 text-center">
              <span className="text-sm font-medium">
                {formType === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <Link
                  to={formType === 'signin' ? '/signup' : '/'}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {formType === 'signin' ? 'Sign Up' : 'Sign In'}
                </Link>
              </span>
            </div>
            <div className="text-center">
              <button
                className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
                type="submit"
                disabled={isSubmitting || loading}
              >
                {loading ? (
                  <svg
                    className="w-5 h-5 mx-auto animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V2.83a1 1 0 00-1.7-.7l-4.5 4.5a1 1 0 000 1.41l4.5 4.5a1 1 0 001.7-.71V8a6 6 0 106 10.2 1 1 0 00-1.2-1.6A8 8 0 014 12z"
                    ></path>
                  </svg>
                ) : formType === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
