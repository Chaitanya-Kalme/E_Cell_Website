"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Edit2, Key, CheckCircle, XCircle } from "lucide-react";

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [participations, setParticipations] = useState([]);

  // Uncomment when API is ready
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`/api/user/profile/${params.userId}`);
  //       const data = await response.json();
  //       if (data.success) {
  //         setUserData(data.data);
  //         setParticipations(data.data.participations || []);
  //       } else {
  //         toast.error(data.message || "Failed to fetch user data");
  //       }
  //     } catch (error) {
  //       toast.error("Error fetching user data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [params.userId]);

  // Demo data for ProfilePage

  const demoUserData = {
    userName: "Riya Sharma",
    email: "riya.sharma@example.com",
    mobileNo: "+91 9876543210",
    isVerified: false,
    participations: [
      {
        id: 1,
        EventParticipated: {
          eventName: "Hackathon 2025",
        },
        TeamName: "Code Warriors",
        participants: [
          { userName: "Riya Sharma" },
          { userName: "Aman Verma" },
          { userName: "Neha Singh" },
        ],
      },
      {
        id: 2,
        EventParticipated: {
          eventName: "Startup Pitch Fest",
        },
        TeamName: "Visionaries",
        participants: [
          { userName: "Riya Sharma" },
          { userName: "Kunal Mehta" },
        ],
      },
      {
        id: 3,
        EventParticipated: {
          eventName: "AI & Robotics Workshop",
        },
        TeamName: null, // Individual
        participants: [{ userName: "Riya Sharma" }],
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setUserData(demoUserData);
      setParticipations(demoUserData.participations || []);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVerify = () => {
    router.push(`/verifyotp/${params.userId}`);
  };

  const handleEditProfile = () => {
    router.push(`/profile/${params.userId}/edit`);
  };

  const handleResetPassword = () => {
    router.push(`/profile/${params.userId}/reset-password`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C670FF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3D0066]/5 to-[#C670FF]/5">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3D0066] to-[#C670FF] text-white py-10 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-bold mb-3">My Profile</h1>
          <p className="text-white/80">
            Manage your account and view your participations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-sm font-semibold text-gray-500">
                    Full Name
                  </h2>
                  <p className="text-lg font-medium text-gray-900">
                    {userData?.userName}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-500">Email</h2>
                  <p className="text-lg font-medium text-gray-900">
                    {userData?.email}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-500">
                    Mobile Number
                  </h2>
                  <p className="text-lg font-medium text-gray-900">
                    {userData?.mobileNo}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-500">
                    Verification Status
                  </h2>
                  <div className="mt-1">
                    {userData?.isVerified ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Verified Account</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-500">
                          <XCircle className="w-5 h-5" />
                          <span className="font-medium">Not Verified</span>
                        </div>
                        <Button
                          onClick={handleVerify}
                          className="w-full bg-[#C670FF] hover:bg-[#3D0066] text-lg h-14"
                        >
                          Verify Now
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <Button
                    onClick={handleEditProfile}
                    className="w-full flex items-center justify-center gap-3 bg-[#C670FF] hover:bg-[#3D0066] text-lg h-14"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleResetPassword}
                    className="w-full flex items-center justify-center gap-3 bg-[#3D0066] hover:bg-[#C670FF] text-lg h-14"
                  >
                    <Key className="w-4 h-4" />
                    Reset Password
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Event Participations Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#3D0066] mb-6">
                Event Participations
              </h2>
              <div className="overflow-hidden">
                <Table>
                  <TableCaption>Your event participation history</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">
                        Event Name
                      </TableHead>
                      <TableHead className="font-semibold">Team Name</TableHead>
                      <TableHead className="font-semibold">
                        Participants
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                          <div className="space-y-2">
                            <p className="text-gray-500 text-lg">
                              You haven't participated in any events yet
                            </p>
                            <Button
                              onClick={() => router.push("/initiatives")}
                              className="bg-[#C670FF] hover:bg-[#3D0066]"
                            >
                              Browse Events
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      participations.map((participation) => (
                        <TableRow
                          key={participation.id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="font-medium text-lg py-6">
                            {participation.EventParticipated.eventName}
                          </TableCell>
                          <TableCell>
                            {participation.TeamName || "Individual"}
                          </TableCell>
                          <TableCell>
                            {participation.participants
                              .map((participant) => participant.userName)
                              .join(", ")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
