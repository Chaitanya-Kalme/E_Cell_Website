StartupExpoCard.jsx"use client";
import React, { act, useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { BackgroundGradient } from "@/components/ui/background-gradient";


export default function AdminNavbar() {
  const [active, setActive] = useState<string | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoids hydration mismatch

  const isDark = resolvedTheme === 'dark'


  const logOutAdmin = async () => {
    await axios.post("/api/admin/logout")
      .then(() => {
        toast.success("Admin Logout Successfully")
        router.replace("/E_Cell_IITRPR_Admin/login")
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }


  return (
    <div className="fixed top-0 inset-x-0 max-w-full h-14 mx-auto z-50 text-xl text-center justify-center gap-x-2">
      <Menu setActive={setActive}>
        <div>
          <Image
            src="/E-Cell Image.jpg"
            alt="My Photo"
            width={48}
            height={48}
            className="border rounded-xl ml-4"
            onClick={() => router.replace("/E_Cell_IITRPR_Admin")}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <button className="p-[2px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md" />
            <div className="px-6 py-1 bg-black rounded-md relative group text-white hover:bg-transparent">
              Home
            </div>
          </button>
          <button className="p-[2px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md" />
            <div className="px-6 py-1 bg-black rounded-md relative group text-white hover:bg-transparent hover:cursor-pointer" onClick={() => router.replace('/E_Cell_IITRPR_Admin/participants')}>
              Participant
            </div>
          </button>
          <button className="p-[2px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md" />
            <div className="px-6 py-1 bg-black rounded-md relative group text-white hover:bg-transparent">
              <MenuItem setActive={setActive} active={active} item="Events">
                <div className="flex flex-col space-y-4 text-m">
                  <HoveredLink href="/E_Cell_IITRPR_Admin/createEvent">Create Event</HoveredLink>
                  <HoveredLink href="/E_Cell_IITRPR_Admin/eventList">Show Event List</HoveredLink>
                </div>
              </MenuItem>
            </div>
          </button>

        </div>

        {/* Theme Toggle Button */}
        <div className="flex justify-center items-center h-full m-0 size-8 mx-4 my-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="font-bold"
          >
            <Moon
              className={`h-4 w-4 transition-all ${isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`}
            />
            <Sun
              className={`absolute h-4 w-4 transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
            />
          </Button>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center items-center h-full mt-2">
          <button
            className="px-3 py-1.5 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-600 hover:-translate-y-1 transform transition duration-200 hover:shadow-md text-base font-medium"
            onClick={() => logOutAdmin()}
          >
            Logout
          </button>
        </div>

      </Menu>
    </div>
  );
}
