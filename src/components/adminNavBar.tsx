"use client";
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


  const logOutAdmin = async () =>{
    await axios.post("/api/admin/logout")
    .then(() =>{
      toast.success("Admin Logout Successfully")
      router.replace("/admin/login")
    })
    .catch((error) =>{
      toast.error(error.response.data.message)
    })
  }


  return (
    <div className="relative w-full flex items-center justify-center top-2">
      <div
        className={cn("fixed top-5 inset-x-0 max-w-full max-h-24 mx-auto z-50 text-xl text-center justify-center gap-x-2")}
      >
        <Menu setActive={setActive} >
          <div>
            <Image
              src="/E-Cell Image.jpg" // Path to your image
              alt="My Photo"
              width={100}               // Required
              height={100}              // Required
              className="border rounded-2xl ml-10"
              onClick={() => router.replace("/admin")}
            />
          </div>
          <div className="w-full flex items-center justify-center gap-5">
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent" onClick={() => router.replace("/admin")}>
                Home
              </div>
            </button>
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                User Data
              </div>
            </button>
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className={`px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent`}>
                <MenuItem setActive={setActive} active={active} item="Events">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/hobby">Hobby</HoveredLink>
                    <HoveredLink href="/individual">Individual</HoveredLink>
                    <HoveredLink href="/team">Team</HoveredLink>
                    <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                  </div>
                </MenuItem>
              </div>
            </button>

          </div>
          <div className="flex justify-center items-center h-full m-1 size-10 mx-8 my-10 ">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="font-bold"
            >
              <Moon
                className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
                  }`}
              />
              <Sun
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
                  }`}
              />
            </Button>
          </div>
          <div className="flex justify-center items-center h-full m-1 mt-10">
            <button className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 hover:-translate-y-1 transform transition duration-200 hover:shadow-md h-full items-center justify-center flex text-xl" onClick={() => logOutAdmin()}>
              Logout
            </button>
          </div>
        </Menu>
      </div>
    </div>
  );
}
