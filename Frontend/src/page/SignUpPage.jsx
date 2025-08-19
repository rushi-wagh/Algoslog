import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";

const SignUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpPage = () => {
  const { signup, isSigninUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
  try {
    const res = await signup(data); // store the response

    if (res?.data?.message === "User already exists") {
      setError("email", {
        type: "manual",
        message: "This email is already registered",
      });
      return; // stop further processing
    }

    console.log("signup data", data);
  } catch (error) {
    console.error("SignUp failed:", error);
  }
};


  return (
    <div className="h-screen bg-[#E1E9C9] grid place-items-center text-gray-500 px-4 w-140">
      <div className="bg-[#F6F7EC] w-full max-w-md rounded-xl shadow-xl p-8 space-y-6 border border-[#e6ebd7]">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E1E9C9] to-[#d3dfb3] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <Code className="w-7 h-7 text-[#2F3E32]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2F3E32]">
              Create Account
            </h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-800 mb-1">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                {...register("name")}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B97A3C] focus:border-[#B97A3C] ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-800 mb-1">
              Email
            </label>
            <div className="relative text-gray-600">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B97A3C] focus:border-[#B97A3C] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-black mb-1">
              Password
            </label>
            <div className="relative text-gray-600">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B97A3C] focus:border-[#B97A3C] ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#B97A3C] hover:bg-[#a56b34] text-white font-medium tracking-wide flex justify-center items-center gap-2 transition-colors"
            disabled={isSigninUp}
          >
            {isSigninUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center ml-5 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#799EFF] font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
