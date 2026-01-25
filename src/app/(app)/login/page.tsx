'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { signInSchema } from "@/schema/userSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [isotpSent, issetOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userId,setUserId] = useState("");

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  const sendOTP = async () => {
    try {
      const response = await axios.post(
        `/api/user/sendOTPForResetPassword`,
        { type: "RESET", email: email }
      );

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        issetOtpSent(true);
        setUserId(response.data.data.id)
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred while sending OTP.";
      toast.error(errorMessage);
    }
  };



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error("Login Failed", {
          description: result.error,
        })
      }
      else {
        toast.error("Error", {
          description: result.error,
        })
      }
    }
    else {
      toast.success("User Login Successfully")
      router.replace('/E-Summit')
    }
    setLoading(false)
  }

  const onError = (error: any) => {
    if (error) {
      Object.values(error).forEach((err: any) => {
        toast.error("Validation Error", {
          description: err.message,
        })
      });
    }
  }

  const handleOtpChange = (index: any, value: any) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: any, e: any) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResetPassword= async () => {
      try {
        if(newPassword!==confirmPassword){
          toast.error("New Password and confirm password does not match")
          return ;
        }
        const response = await axios.post(
            `/api/user/resetPassword/${userId}`,
            {
              resetPasswordCode: otp.join(""),
              newPassword: newPassword,
              confirmPassword: confirmPassword,
            }
          );
  
        if(response.data.success) {
          toast.success(response.data.message);
          router.replace("/login")
        } else {
          toast.error(response.data.message || "Failed to reset password");
        }
      } catch (error:any) {
        console.error("Error resetting password:", error);
        const errorMessage =
          error.response?.data?.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
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
          <h2 className="text-3xl font-bold text-blue-700 dark:text-orange-200">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{!isForgotPassword ? "Sign in to your account" : "We send OTP for verification to your Email Id."}</p>
        </div>

        {/* Login Form */}
        {!isForgotPassword && (<Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Lock className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 dark:hover:text-orange-200"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(true);
              }}
              className="text-sm text-blue-700 dark:text-orange-200 hover:text-blue-800 dark:hover:text-orange-300 font-semibold transition-colors duration-200 hover:cursor-pointer"
            >
              Forgot Password?
            </button>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-700 dark:bg-orange-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-orange-300 focus:ring-4 focus:ring-blue-700/50 dark:focus:ring-orange-200/50 transition-colors duration-200"
            >
              Sign In
            </button>


          </form>
        </Form>)}


        {/* Forgot Password */}
        {isForgotPassword && !isotpSent && (
          <div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                <Mail className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                Email Address
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                onChange={(e) => setEmail(e.target.value)}
                required

              />
            </div>

            <button
              onClick={() => sendOTP()}
              className="w-full py-3 px-4 bg-blue-700 dark:bg-orange-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-orange-300 focus:ring-4 focus:ring-blue-700/50 dark:focus:ring-orange-200/50 transition-colors duration-200"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* Change Password */}
        {isForgotPassword && isotpSent && (
          <div>
            {/* OTP Input Section */}
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
                onClick={sendOTP}
                className="mt-2 text-sm text-blue-700 dark:text-orange-200 hover:text-blue-800 dark:hover:text-orange-300 font-semibold transition-colors duration-200"
              >
                Resend OTP
              </button>
            </div>

            {/* New Password */}
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Lock className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 dark:hover:text-orange-200"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-[#C670FF]" />
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C670FF]"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Reset Password
              </button>
            </div>
          </div>
        )}



      </div >
    </div >
  );
};

export default LoginPage;

