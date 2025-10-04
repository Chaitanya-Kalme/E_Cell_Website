"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

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

  const sendOTP = async () => {
    try {
      const response = await axios.post(
        `/api/user/sendOTPForResetPassword/${params.userId}`,
        { type: "RESET" }
      );

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred while sending OTP.";
      toast.error(errorMessage);
    }
  };

  const onSubmit = async (data) => {
    try {
      let response;

      if (isForgotPassword) {
        // Reset password with OTP flow
        response = await axios.post(
          `/api/user/resetPassword/${params.userId}`,
          {
            newPassword: data.newPassword,
            resetPasswordCode: otp.join(""),
          }
        );
      } else {
        // Update password with current password flow
        response = await axios.post(
          `/api/user/updatePassword/${params.userId}`,
          {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
          }
        );
      }

      if (response.data.success) {
        toast.success(response.data.message);
        router.push(`/profile/${params.userId}`);
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#3D0066] to-[#C670FF] py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg my-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-6">
            {!isForgotPassword && (
              /* Current Password Field */
              <div className="mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-[#C670FF]" />
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
                    {...register("currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C670FF]"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password Button */}
            {!isForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  sendOTP();
                  setIsForgotPassword(true);
                }}
                className="text-sm text-[#C670FF] hover:text-[#9F45D9] font-semibold transition-colors duration-200"
              >
                Forgot Password?
              </button>
            )}
            {/* OTP Field - Only show if OTP has been sent */}
            {otpSent && (
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-[#C670FF]" />
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
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={sendOTP}
                  className="mt-2 text-sm text-[#C670FF] hover:text-[#9F45D9] font-semibold transition-colors duration-200"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* New Password Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-[#C670FF]" />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C670FF]"
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

            {/* Confirm Password Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-[#C670FF]" />
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C670FF]"
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
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-[#C670FF] hover:bg-[#9F45D9] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
