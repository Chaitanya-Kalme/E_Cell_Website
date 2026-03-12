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
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const user = session?.user as User;
  const isDark = resolvedTheme === "dark";

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const Logout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" })
      .then(() => {
        toast.success("User Logout Successfully");
        setTimeout(() => {
          router.push("/E-Summit");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Error while Logout", {
          description: error.message,
        });
      });
  };

  return (
   <div className="w-full bg-gradient-to-b from-blue-950 to-blue-900 fixed top-0 left-0 right-0 z-50 text-lg">
      <NavigationMenu
        viewport={false}
        className="text-whitepx-1 py-3 pt-4 max-w-full md:mr-5 2xl:mr-10 flex justify-between"
      >
        {/* Left side: Image */}
        <NavigationMenuItem className="flex items-start h-20 ml-4">
          <Image
            src="/E-Summit Logo.png"
            alt="E-Summit Logo"
            width={300}
            height={700}
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

          {session ? (
            <div className="space-x-2 md:flex text-white">
              {/* Profile Section */}
              <Link
                href={`/profile/${session.user.id}`}
                className="rounded-md px-3 py-1 bg-white/10 hover:bg-white/25 text-white font-semibold transition"
              >
                Profile
              </Link>

              <Button
                onClick={() => Logout()}
                className="rounded-md px-3 py-1 bg-white/10 hover:bg-white/25 text-white font-semibold transition"
              >
                Logout
                <div>
                  <LogOut />
                </div>
              </Button>
            </div>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="dark:bg-white text-black hover:text-black cursor-pointer">
                Join Us
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-full">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/registration"
                        className="block px-2 text-center hover:bg-gray-700 rounded"
                      >
                        Register
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/login"
                        className="block px-2 hover:bg-gray-700 rounded"
                      >
                        Login
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>

        {/* Mobile Menu Button */}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 md:hidden
               bg-white/10 backdrop-blur
               text-white hover:bg-white/20
               rounded-full"
            >
              <Menu size={26} />
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
              onClick={() => handleNavigate("/E-Summit/contact")}
              className="text-blue-950 font-semibold
               hover:bg-blue-100 hover:text-blue-900
               rounded-md cursor-pointer"
            >
              Contact Us
            </DropdownMenuItem>

            {/* Auth Section */}
            {session ? (
              <>
                <DropdownMenuSeparator className="bg-blue-300" />

                <DropdownMenuItem
                  onClick={() => handleNavigate(`/profile/${session.user.id}`)}
                  className="text-indigo-900 font-semibold
                   hover:bg-indigo-100 rounded-md"
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-blue-200" />

                <DropdownMenuItem
                  onClick={() => {
                    Logout();
                    setOpen(false);
                  }}
                  className="text-red-600 font-semibold
                   hover:bg-red-100 rounded-md"
                >
                  Logout <LogOut className="ml-2 h-4 w-4" />
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuSeparator className="bg-blue-300" />

                <DropdownMenuItem
                  onClick={() => handleNavigate("/registration")}
                  className="text-green-700 font-semibold
                   hover:bg-green-100 rounded-md"
                >
                  Register
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-blue-200" />

                <DropdownMenuItem
                  onClick={() => handleNavigate("/login")}
                  className="text-blue-700 font-semibold
                   hover:bg-blue-100 rounded-md"
                >
                  Login
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenu>
    </div>
  );
}
