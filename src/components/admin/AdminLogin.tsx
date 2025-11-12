import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  // Handle lockout timer
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockoutTime === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [lockoutTime, isLocked]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Terlalu banyak percobaan login. Coba lagi dalam ${lockoutTime} detik.`);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Basic input validation
      if (!email.trim() || !password.trim()) {
        setError('Email dan password harus diisi');
        setIsLoading(false);
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Format email tidak valid');
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password 
      });

      if (error) {
        // Increment login attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        // Lock after 5 failed attempts
        if (newAttempts >= 5) {
          setIsLocked(true);
          setLockoutTime(300); // 5 minutes lockout
          setError('Terlalu banyak percobaan login gagal. Akun dikunci selama 5 menit.');
        } else {
          // Generic error message for security
          setError('Email atau password salah. Sisa percobaan: ' + (5 - newAttempts));
        }
        setIsLoading(false);
        return;
      }

      // Reset attempts on successful login
      setLoginAttempts(0);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-red-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-linear-to-r from-red-500 to-orange-500 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Masuk ke dashboard admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Masukkan email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Masukkan password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full bg-linear-to-r from-red-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Memproses...' : isLocked ? `Dikunci (${lockoutTime}s)` : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium inline-flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Portfolio
            </a>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-2xl text-sm text-gray-600">
            <p className="font-semibold mb-2 text-gray-900">Info:</p>
            <div className="space-y-1">
              <p>Gunakan akun email yang terdaftar di Supabase Auth untuk login.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
