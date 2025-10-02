"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, LogOut, Menu } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import { User } from "next-auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"




export default function NavBar() {

  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user as User

  const Logout = async () => {

    await signOut({ redirect: false, callbackUrl: '/' })
      .then(() => {
        toast.success("User Logout Successfully")
        setTimeout(() => {
          router.push('/')
        }, 1000);
      })
      .catch((error) => {
        toast.error("Error while Logout", {
          description: error.message
        })
      })
  }

  return (
    <div className="w-full bg-gray-800 fixed top-0 left-0 right-0 z-50 text-lg">
      <NavigationMenu viewport={false} className="flex items-center justify-between text-white px-4 py-3 max-w-screen-xl mx-auto">
        {/* Left side: Image */}
        <NavigationMenuItem className="flex items-center">
          <Image
            src="/E-Cell Image.jpg"
            alt="E-Cell Image"
            width={70}
            height={70}
            className="rounded"
          />
        </NavigationMenuItem>

        {/* Right side: Navigation Buttons */}
        <NavigationMenuList className="gap-x-6 hidden md:flex">
          <NavigationMenuItem><Link href="/" className="hover:text-gray-300">Home</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/initiatives" className="hover:text-gray-300">Initiatives</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/about" className="hover:text-gray-300">About Us</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/contact" className="hover:text-gray-300">Contact Us</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/blogs" className="hover:text-gray-300">Blogs</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/gallery" className="hover:text-gray-300">Gallery</Link></NavigationMenuItem>
          {session ? (
            <div className="space-x-2 md:flex text-white">
              {/* Profile Section */}
              <Link href="/profile" className="rounded-md p-1 px-2 bg-gray-800 hover:bg-blue-300">
                Profile
              </Link>

              <Button onClick={() => Logout()} className="rounded-md bg-gray-800 hover:bg-blue-300">Logout
                <div>
                  <LogOut />
                </div>
              </Button>
            </div>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-black cursor-pointer">Join Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-full">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/registration" className="block px-2 text-center hover:bg-gray-700 rounded">
                        Register
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/login" className="block px-2 hover:bg-gray-700 rounded">
                        Login
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 md:hidden">
              <Menu size={28} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-6 ml-auto right-0">
            <DropdownMenuItem><Link href="/" className="hover:text-gray-300">Home</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/initivatives" className="hover:text-gray-300">Initivaties</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/about" className="hover:text-gray-300">About Us</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/contact" className="hover:text-gray-300">Contact Us</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/blogs" className="hover:text-gray-300">Blogs</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/gallery" className="hover:text-gray-300">Gallery</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            {session ? (
              <div className=" text-black bg-white">
                <DropdownMenuItem className="hover:cursor-pointer hover:text-gray-300">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => Logout()} className="hover:bg-blue-300 hover:cursor-pointer">
                  Logout
                  <div>
                    <LogOut />
                  </div>
                </DropdownMenuItem>
              </div>
            ) : (
              <div>
                <DropdownMenuItem><Link href="/registration" className="block px-2 text-center hover:bg-gray-700 rounded">
                  Register
                </Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/login" className="block px-2 hover:bg-gray-700 rounded">
                  Login
                </Link></DropdownMenuItem>
              </div>
            )}


          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenu>
    </div>
  )
}





