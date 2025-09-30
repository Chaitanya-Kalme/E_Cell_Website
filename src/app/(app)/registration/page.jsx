'use client';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    // router.push(`/verifyotp/65475656`); // Temporary redirect for testing
    try {
      setIsLoading(true);
      setError("");
      
      const response = await fetch("/api/user/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.name,
          email: data.email,
          mobileNo: data.mobile,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Registration failed");
        throw new Error(result.message || "Registration failed");
      }

      if (result.success && result.data?.id) {
        toast.success("Registration successful! Please verify your email.");
        router.push(`/verifyotp/${result.data.id}`);
      } else {
        toast.error("Registration failed");
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      setError(error.message || "An error occurred during registration");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3D0066] to-[#C670FF]">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/E-Cell Image.jpg"
            alt="E-Cell Logo"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
          <h2 className="text-3xl font-bold text-[#3D0066]">Create Account</h2>
          <p className="text-gray-600 mt-2">Join the E-Cell community</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 text-[#C670FF]" />
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 text-[#C670FF]" />
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-[#C670FF]" />
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Lock className="w-4 h-4 text-[#C670FF]" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: "Password must contain at least one letter and one number",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C670FF]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#C670FF] text-white font-semibold rounded-lg hover:bg-[#3D0066] focus:ring-4 focus:ring-[#C670FF]/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
