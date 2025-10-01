"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, Menu } from "lucide-react"

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



export default function NavBar() {
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
          <NavigationMenuItem><Link href="/initivatives" className="hover:text-gray-300">Initivaties</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/about" className="hover:text-gray-300">About Us</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/contact" className="hover:text-gray-300">Contact Us</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/blogs" className="hover:text-gray-300">Blogs</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/gallery" className="hover:text-gray-300">Gallery</Link></NavigationMenuItem>
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
        </NavigationMenuList>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 md:hidden">
               <Menu size={28}  />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-8 ml-auto right-0">
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
            <DropdownMenuItem><Link href="/registration" className="block px-2 text-center hover:bg-gray-700 rounded">
              Register
            </Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/login" className="block px-2 hover:bg-gray-700 rounded">
                      Login
                    </Link></DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenu>
    </div>
  )
}





