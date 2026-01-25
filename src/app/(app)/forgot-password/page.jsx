"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");
  const emailValue = watch("email");

  // Send OTP
  const handleSendOTP = async () => {
    if (!emailValue) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsSendingOTP(true);

      // Get userId from email
      const userResponse = await axios.post("/api/user/findByEmail", {
        email: emailValue,
      });

      if (userResponse.data.success && userResponse.data.userId) {
        setUserId(userResponse.data.userId);
        setEmail(emailValue);

        // Send OTP
        const otpResponse = await axios.post(
          `/api/user/sendOTPForResetPassword/${userResponse.data.userId}`,
          { type: "RESET" }
        );

        if (otpResponse.data.success) {
          toast.success("OTP sent to your email!");
          setOtpSent(true);
        } else {
          toast.error(otpResponse.data.message || "Failed to send OTP");
        }
      } else {
        toast.error(userResponse.data.message || "User not found with this email");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSendingOTP(false);
    }
  };

  // Handle OTP Input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      setIsSendingOTP(true);
      const response = await axios.post(
        `/api/user/sendOTPForResetPassword/${userId}`,
        { type: "RESET" }
      );

      if (response.data.success) {
        toast.success("OTP resent successfully!");
        setOtp(["", "", "", "", "", ""]);
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP");
    } finally {
      setIsSendingOTP(false);
    }
  };

  // Reset Password
  const handlePasswordSubmit = async (data) => {
    if (!otpSent) {
      toast.error("Please send OTP first");
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`/api/user/resetPassword/${userId}`, {
        newPassword: data.newPassword,
        resetPasswordCode: otpCode,
      });

      if (response.data.success) {
        toast.success("Password reset successful! Please login with your new password.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-600 dark:from-orange-200 dark:to-orange-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/E-Cell Image.jpg"
            alt="E-Cell Logo"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
          <h2 className="text-3xl font-bold text-blue-700 dark:text-orange-200">
            Forgot Password
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            Enter your email and reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-4 h-4 text-blue-700 dark:text-orange-200" />
              Email Address
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                disabled={otpSent}
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={isSendingOTP || otpSent || !emailValue}
                className="px-4 py-3 bg-blue-700 dark:bg-orange-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-orange-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSendingOTP ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : otpSent ? (
                  "Sent"
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP Input - Shown after OTP is sent */}
          {otpSent && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Lock className="w-4 h-4 text-blue-700 dark:text-orange-200" />
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
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isSendingOTP}
                className="mt-2 text-sm text-blue-700 dark:text-orange-200 hover:text-blue-800 dark:hover:text-orange-300 font-semibold transition-colors duration-200"
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* New Password - Shown after OTP is sent */}
          {otpSent && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Lock className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                      message:
                        "Password must contain at least one letter and one number",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 dark:hover:text-orange-200"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          )}

          {/* Confirm Password - Shown after OTP is sent */}
          {otpSent && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Lock className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 dark:hover:text-orange-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button - Only shown after OTP is sent */}
          {otpSent && (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-700 dark:bg-orange-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-orange-300 focus:ring-4 focus:ring-blue-700/50 dark:focus:ring-orange-200/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          )}

          {/* Back to Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-orange-200 transition-colors duration-200 flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
