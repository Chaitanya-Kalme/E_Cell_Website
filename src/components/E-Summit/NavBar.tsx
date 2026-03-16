"use client";

import * as React from "react";
import Link from "next/link";
import { LogOut, Menu, Moon, Sun } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function NavBar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };


  return (
    <div className="w-full bg-gradient-to-b from-blue-950 to-blue-900 fixed top-0 left-0 right-0 z-50 text-lg">
      <NavigationMenu
        className="text-white px-1 py-2 max-w-full md:mr-5 2xl:mr-10 flex justify-between"
      >
        <NavigationMenuItem className="flex items-center h-16 ml-4 top-1">
          <Image
            src="/E-Summit Logo2.png"
            alt="E-Summit Logo"
            width={300}
            height={500}
            className="rounded"
          />
        </NavigationMenuItem>

        {/* Right side: Navigation Buttons */}
        <NavigationMenuList className="flex gap-x-2 hidden md:flex right-0 text-white text-xl font-semibold">
          <NavigationMenuItem>
            <Link
              href="/E-Summit"
              className="relative px-3 py-1 transition-all duration-300
              hover:text-yellow-300
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-yellow-300 after:transition-all
              after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/E-Summit/events"
              className="relative px-3 py-1 transition-all duration-300
              hover:text-yellow-300
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-yellow-300 after:transition-all
              after:duration-300 hover:after:w-full"
            >
              Events
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/E-Summit/team"
              className="relative px-3 py-1 transition-all duration-300
              hover:text-yellow-300
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-yellow-300 after:transition-all
              after:duration-300 hover:after:w-full"
            >
              Our Team
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/E-Summit/sponsorship"
              className="relative px-3 py-1 transition-all duration-300
              hover:text-yellow-300
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-yellow-300 after:transition-all
              after:duration-300 hover:after:w-full"
            >
              Sponsors
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/E-Summit/ca"
              className="relative px-3 py-1 transition-all duration-300
              hover:text-yellow-300
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-yellow-300 after:transition-all
              after:duration-300 hover:after:w-full"
            >
              CA
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/E-Summit/contact"
              className="relative px-3 py-1 transition-all duration-300
              hover:text-yellow-300
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-yellow-300 after:transition-all
              after:duration-300 hover:after:w-full"
            >
              Contact Us
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>

        {/* Mobile Menu Button */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 md:hidden
   bg-white/10 backdrop-blur
   text-white hover:bg-white/20
   rounded-full"
            >
              <Menu size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="mt-4 ml-2 w-56 md:hidden
               bg-white/95 backdrop-blur
               border border-blue-200
               rounded-xl shadow-xl"
          >
            {/* Main Links */}
            <DropdownMenuItem
              onClick={() => handleNavigate("/E-Summit")}
              className="text-blue-950 font-semibold
               hover:bg-blue-100 hover:text-blue-900
               rounded-md cursor-pointer"
            >
              Home
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-blue-200" />

            <DropdownMenuItem
              onClick={() => handleNavigate("/E-Summit/events")}
              className="text-blue-950 font-semibold
               hover:bg-blue-100 hover:text-blue-900
               rounded-md cursor-pointer"
            >
              Events
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-blue-200" />

            <DropdownMenuItem
              onClick={() => handleNavigate("/E-Summit/team")}
              className="text-blue-950 font-semibold
               hover:bg-blue-100 hover:text-blue-900
               rounded-md cursor-pointer"
            >
              Our Team
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-blue-200" />

            <DropdownMenuItem
              onClick={() => handleNavigate("/E-Summit/sponsorship")}
              className="text-blue-950 font-semibold
               hover:bg-blue-100 hover:text-blue-900
               rounded-md cursor-pointer"
            >
              Sponsors
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-blue-200" />

            <DropdownMenuItem
              onClick={() => handleNavigate("/E-Summit/ca")}
              className="text-blue-950 font-semibold
               hover:bg-blue-100 hover:text-blue-900
               rounded-md cursor-pointer"
            >
              Campus Ambassador
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-blue-200" />

            <DropdownMenuItem
              onClick={() => handleNavigate("/E-Summit/contact")}
              className="text-blue-950 font-semibold
               hover:bg-blue-100 hover:text-blue-900
               rounded-md cursor-pointer"
            >
              Contact Us
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenu>
    </div>
  );
}
