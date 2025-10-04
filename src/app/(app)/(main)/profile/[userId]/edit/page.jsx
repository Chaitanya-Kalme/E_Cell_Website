"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Save, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const EditProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const params = useParams();
  const router = useRouter();
  const userId = params.userId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(`/api/user/profile/${userId}`);
        setCurrentUserData(response.data);
        reset(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Failed to load user profile. Please try again.";
        toast.error(errorMessage);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [userId, reset]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/user/updateDetails/${userId}`, {
        userName: data.userName,
        email: data.email,
        mobileNo: data.mobileNo,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        router.push(`/profile/${userId}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3D0066] to-[#C670FF] py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
          <p className="text-white text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3D0066] to-[#C670FF] py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl my-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#3D0066] to-[#C670FF] rounded-full flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#3D0066]">Edit Profile</h2>
          <p className="text-gray-600 mt-2">Update your account information</p>
        </div>

        {/* Edit Profile Form */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 text-[#C670FF]" />
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
              {...register("userName", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
              })}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C670FF] focus:border-[#C670FF] transition-colors duration-200 text-black"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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
              {...register("mobileNo", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNo.message}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            className="w-full py-3 px-4 bg-[#C670FF] text-white font-semibold rounded-lg hover:bg-[#3D0066] focus:ring-4 focus:ring-[#C670FF]/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
