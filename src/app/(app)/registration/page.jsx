'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Mail, Lock, User, Check } from "lucide-react";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const email = watch('email');

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const sendOtp = async () => {
    // Add your OTP sending logic here
    console.log('Sending OTP to:', email);
    setShowOtpInput(true);
  };

  const verifyOtp = async () => {
    // Add your OTP verification logic here
    console.log('Verifying OTP:', otp.join(''));
    setEmailVerified(true);
    setShowOtpInput(false);
  };

  const onSubmit = async (data) => {
    if (!emailVerified) {
      alert('Please verify your email first');
      return;
    }
    console.log(data);
    // Add your registration logic here
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
              {emailVerified && (
                <span className="text-green-500 flex items-center gap-1 text-xs">
                  <Check className="w-3 h-3" /> Verified
                </span>
              )}
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                disabled={emailVerified}
              />
              {email && !emailVerified && (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="px-4 py-2 bg-[#C670FF] text-white font-semibold rounded-lg hover:bg-[#3D0066] focus:ring-4 focus:ring-[#C670FF]/50 transition-colors duration-200"
                >
                  Send OTP
                </button>
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* OTP Input */}
          {showOtpInput && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Enter OTP
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={verifyOtp}
                className="w-full py-2 bg-[#C670FF] text-white font-semibold rounded-lg hover:bg-[#3D0066] focus:ring-4 focus:ring-[#C670FF]/50 transition-colors duration-200"
              >
                Verify OTP
              </button>
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Lock className="w-4 h-4 text-[#C670FF]" />
              Password
            </label>
            <input
              type="password"
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#C670FF] text-white font-semibold rounded-lg hover:bg-[#3D0066] focus:ring-4 focus:ring-[#C670FF]/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!emailVerified}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
