'use client';

import { useState } from 'react';

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthOverlay({ isOpen, onClose }: AuthOverlayProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    phonenumber: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setSuccess('Login successful!');
        setTimeout(() => {
          onClose();
          setLoginData({ email: '', password: '' });
        }, 1000);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        setSuccess('Registration successful!');
        setTimeout(() => {
          onClose();
          setRegisterData({ email: '', phonenumber: '', password: '' });
        }, 1000);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-10 w-full max-w-md shadow-lg animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900 transition"
        >
          ✕
        </button>

        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
            />

            {error && (
              <p className="text-red-600 text-sm p-2 bg-red-100 rounded">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-600 text-sm p-2 bg-green-100 rounded">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-sm text-gray-700">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setSuccess('');
                }}
                className="text-blue-500 font-semibold hover:text-blue-600 underline"
              >
                Register
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-gray-800">Register</h2>

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={registerData.phonenumber}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  phonenumber: e.target.value,
                })
              }
              required
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
              className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
            />

            {error && (
              <p className="text-red-600 text-sm p-2 bg-red-100 rounded">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-600 text-sm p-2 bg-green-100 rounded">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center text-sm text-gray-700">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setSuccess('');
                }}
                className="text-blue-500 font-semibold hover:text-blue-600 underline"
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
