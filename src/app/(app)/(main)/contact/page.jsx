"use client";
import React, { useContext, useState } from "react";
import { dataContext } from "@/context/dataContext";
import ContactCard from "@/components/contactCards";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import axios from "axios";

const contact = () => {
  const { coreTeam, teamMembers } = useContext(dataContext);
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
      await axios.post("/api/user/sendRequestEmail",{
        fullName: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message 
      })
      .then((response) =>{
        toast.success("Feedback submitted successfully! We'll get back to you soon.");
      })
      .catch((error) =>{
        toast.error(error.response.data.message)
      })
      reset();
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 min-h-screen mt-24">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-700 dark:text-orange-300">CONTACT US</h1>
      
      {/* Feedback Form */}
      <div className="max-w-2xl mx-auto mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-orange-200 mb-2">Share Your Feedback</h2>
          <p className="text-gray-600 dark:text-gray-300">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4 text-blue-700 dark:text-orange-200" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-700 dark:text-orange-200" />
              Subject
            </label>
            <input
              type="text"
              placeholder="What's this about?"
              className="w-full px-4 py-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 5,
                  message: "Subject must be at least 5 characters"
                }
              })}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-700 dark:text-orange-200" />
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Tell us more about your feedback, questions, or suggestions..."
              className="w-full px-4 py-3 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 dark:focus:ring-orange-200 focus:border-blue-700 dark:focus:border-orange-200 transition-colors duration-200 text-black dark:text-white dark:bg-gray-700 resize-vertical"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters"
                }
              })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 dark:bg-orange-200 dark:hover:bg-orange-300 text-white dark:text-gray-900 font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Team Section */}
      <h2 className="text-4xl font-bold text-center mb-12 text-[#3D0066] dark:text-orange-300">MEET OUR TEAM</h2>
      <div className="flex justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 justify-items-center items-center">
          {coreTeam.map((member, index) => (
            <ContactCard key={index} member={member} />
          ))}
        </div>
      </div>
      <div className="flex justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 items-center justify-center auto-rows-max">
          {teamMembers.map((member, index) => (
            <ContactCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default contact;