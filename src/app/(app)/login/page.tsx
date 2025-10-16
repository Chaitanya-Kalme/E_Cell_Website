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

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);


  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true)
    console.log(data)
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
      router.replace('/')
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
          <p className="text-gray-600 dark:text-gray-300 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Form {...form}>
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


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-700 dark:bg-orange-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-blue-800 dark:hover:bg-orange-300 focus:ring-4 focus:ring-blue-700/50 dark:focus:ring-orange-200/50 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

