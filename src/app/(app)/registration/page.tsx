"use client";
import React, { useState } from "react";
import {useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { registrationSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const RegistrationPage = () => {
  const router = useRouter();



  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      mobileNo: ""
    },
  })

  const onSubmit = async (data: z.infer<typeof registrationSchema>) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post("/api/user/registerUser", {
        userName: data.userName,
        email: data.email,
        mobileNo: data.mobileNo,
        password: data.password,
      });

      if (response.data.success && response.data.data?.id) {
        toast.success("Registration successful! Please verify your email.");
        router.push(`/verifyotp/${response.data.data.id}`);
      } else {
        const errorMsg = response.data.message || "Registration failed";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during registration";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (error: any) => {
    if (error) {
      Object.values(error).forEach((err: any) => {
        toast.error("Validation Error", {
          description: err.message,
        })
      });
    }
  }

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
          <h2 className="text-3xl font-bold text-blue-700 dark:text-orange-200">Create Account</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Join the E-Cell community</p>
        </div>
        <Form {...form}>
          {/* Registration Form */}
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
            <FormField
              control={form.control}
              name="userName"
              rules={{
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <User className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />


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
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="mobileNo"
              rules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                    Mobile Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 7,
                  message: "Password must be at least 7 characters",
                },
                pattern: {
                  value: /[!@#$%^&*(),.?":{}|<>]/,
                  message: "Password must contain at least one special character",
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
                        placeholder="Create a password"
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
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-700 dark:bg-orange-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-orange-300 focus:ring-4 focus:ring-blue-700/50 dark:focus:ring-orange-200/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
