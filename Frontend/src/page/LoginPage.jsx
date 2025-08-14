import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';

const LoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="h-screen bg-[#E1E9C9] grid place-items-center px-4">
  <div className="bg-[#F6F7EC] w-full max-w-md rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 space-y-6 border border-[#e6ebd7]">
    {/* Logo */}
    <div className="text-center mb-6">
      <div className="flex flex-col items-center gap-3 group">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E1E9C9] to-[#d3dfb3] flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
          <Code className="w-7 h-7 text-[#2F3E32] group-hover:text-[#B97A3C] transition-colors" />
        </div>
        <h1 className="text-2xl font-bold text-[#2F3E32]">Welcome Back</h1>
        <p className="text-gray-600">Login to your account</p>
      </div>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block font-medium text-gray-800 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#B97A3C]" />
          <input
            type="email"
            {...register('email')}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B97A3C]/70 focus:border-[#B97A3C] focus:shadow-[0_0_8px_rgba(185,122,60,0.5)] transition-all duration-200 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block font-medium text-black mb-1">Password</label>
        <div className="relative text-gray-600">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#B97A3C]" />
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B97A3C]/70 focus:border-[#B97A3C] focus:shadow-[0_0_8px_rgba(185,122,60,0.5)] transition-all duration-200 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B97A3C] transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-[#B97A3C] hover:bg-[#a56b34] text-white font-medium tracking-wide flex justify-center items-center gap-2 transition-all duration-200 hover:shadow-[0_0_12px_rgba(185,122,60,0.6)] hover:scale-[1.02]"
        disabled={isLoggingIn}
      >
        {isLoggingIn ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  </div>
</div>
  );
};

export default LoginPage;
