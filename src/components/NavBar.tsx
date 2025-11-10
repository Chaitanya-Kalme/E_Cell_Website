"use client"

import * as React from "react"
import Link from "next/link"
import { LogOut, Menu, Moon, Sun } from "lucide-react"

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
import { useTheme } from "next-themes"




export default function NavBar() {

  const router = useRouter()
  const { data: session } = useSession()
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const user = session?.user as User
  const isDark = resolvedTheme === 'dark'

  const handleNavigate = (href: string) => {
    setOpen(false)
    router.push(href)
  }

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
        <NavigationMenuList className="gap-x-6 hidden md:flex dark:text-white">
          <NavigationMenuItem><Link href="/" className="hover:text-gray-300">Home</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/initiatives" className="hover:text-gray-300">Initiatives</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/about" className="hover:text-gray-300">About Us</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/contact" className="hover:text-gray-300">Contact Us</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/blogs" className="hover:text-gray-300">Blogs</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/gallery" className="hover:text-gray-300">Gallery</Link></NavigationMenuItem>
          <NavigationMenuItem>
            <div className="flex justify-center items-center h-full m-0 size-8 mx-4 my-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="font-bold"
              >
                <Moon
                  className={`h-4 w-4 transition-all ${isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0 text-black'}`}
                />
                <Sun
                  className={`absolute h-4 w-4 transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
                />
              </Button>
            </div>
          </NavigationMenuItem>
          {session ? (
            <div className="space-x-2 md:flex text-white">
              {/* Profile Section */}
              <Link href={`/profile/${session.user.id}`} className="rounded-md p-1 px-2 bg-gray-800 hover:bg-blue-300">
                Profile
              </Link>

              <Button onClick={() => Logout()} className="rounded-md bg-gray-800 hover:bg-blue-300 dark:text-white">Logout
                <div>
                  <LogOut />
                </div>
              </Button>
            </div>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="dark:bg-white text-black hover:text-black cursor-pointer">Join Us</NavigationMenuTrigger>
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

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 md:hidden">
              <Menu size={28} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="mt-6 ml-auto md:hidden">
            <DropdownMenuItem onClick={() => handleNavigate("/")}>Home</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigate("/initiatives")}>Initiatives</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigate("/about")}>About Us</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigate("/contact")}>Contact Us</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigate("/blogs")}>Blogs</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigate("/gallery")}>Gallery</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Theme Toggle Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setTheme(isDark ? "light" : "dark")
                setOpen(false)
              }}
              className="font-bold"
            >
              <Moon
                className={`h-4 w-4 transition-all ${isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`}
              />
              <Sun
                className={`absolute h-4 w-4 transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
              />
            </Button>
            <DropdownMenuSeparator />
            {session ? (
              <div className="text-black dark:text-white">
                <DropdownMenuItem onClick={() => handleNavigate(`/profile/${session.user.id}`)}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    Logout()
                    setOpen(false)
                  }}
                  className="hover:bg-blue-300"
                >
                  Logout <LogOut className="ml-2" />
                </DropdownMenuItem>
              </div>
            ) : (
              <div>
                <DropdownMenuItem onClick={() => handleNavigate("/registration")}>
                  Register
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate("/login")}>
                  Login
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenu>
    </div>
  )
}





