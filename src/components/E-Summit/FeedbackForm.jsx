"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      //   await axios
      //     .post("/api/user/sendRequestEmail", {
      //       fullName: data.name,
      //       email: data.email,
      //       subject: data.subject,
      //       message: data.message,
      //     })
      //     .then((response) => {
      //       toast.success(
      //         "Feedback submitted successfully! We'll get back to you soon."
      //       );
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //       toast.error(error.response.data.message);
      //     });
      //   reset();
      console.log("Feedback data:", data);
      toast.success(
        "Feedback submitted successfully! We'll get back to you soon.",
      );
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {/* Feedback Form */}
      <div className="bg-[#021334] rounded-xl shadow-lg p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-3">
                <User className="w-5 h-5 text-blue-400" />
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors duration-200 text-white placeholder-gray-400"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-3">
                <Mail className="w-5 h-5 text-blue-400" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors duration-200 text-white placeholder-gray-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-3">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Subject
            </label>
            <Input
              type="text"
              placeholder="What's this about?"
              className="w-full px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors duration-200 text-white placeholder-gray-400"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 5,
                  message: "Subject must be at least 5 characters",
                },
              })}
            />
            {errors.subject && (
              <p className="text-red-400 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-3">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Tell us more about your feedback, questions, or suggestions..."
              className="w-full px-4 py-3 border border-gray-600 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors duration-200 text-white placeholder-gray-400 resize-vertical"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
