"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";

const VerifyOtp = () => {
  const router = useRouter();
  const params = useParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
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

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        `/api/user/verifyUser/${params.userId}`,
        {
          verificationCode: otp.join(""),
        }
      );

      if (response.data.success) {
        toast.success("Email verified successfully! Please login.");
        router.push("/login");
      } else {
        const errorMsg = response.data.message || "Invalid OTP";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during verification";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-300 dark:from-orange-400 dark:to-orange-200">
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
          <h2 className="text-3xl font-bold text-blue-700 dark:text-orange-200">Verify Email</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-6">
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
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset] [&:-webkit-autofill]:text-black"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={verifyOtp}
            disabled={isLoading || otp.some((digit) => !digit)}
            className="w-full py-3 px-4 bg-blue-700 dark:bg-orange-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-orange-300 focus:ring-4 focus:ring-blue-700/50 dark:focus:ring-orange-200/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
