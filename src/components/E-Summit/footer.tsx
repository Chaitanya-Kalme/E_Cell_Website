"use client"
import { Mail, MapPinIcon } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {

  const router = useRouter()


  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll",
        `${window.scrollY * 0.05}px`
      );
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* 🌊 Ocean Footer */}
      <footer className="ocean relative text-white pt-24 pb-16 px-4">
        <div className="ocean-depth" />
        {/* 🌊 SVG WAVE */}
        <div className="wave-top -mt-8">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-[80px]"
          >
            <path
              d="M0,60 C120,90 360,20 720,40 1080,60 1320,20 1440,40 L1440,0 L0,0 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* 💧 BUBBLES */}
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${18 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
            }}
          />
        ))}

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LOGO */}
          {/* LOGO + SOCIALS */}
          <div className="flex flex-col items-start">
            {/* Logo */}
            <img
              src="E-Summit Logo.png"
              alt="E-Summit"
              width="800"
              height="800"
            />

            {/* Social Media Icons */}
            <div className="mt-4 flex items-center gap-4 ml-20 text-center w-full">
              <a
                href="https://www.linkedin.com/company/e-cell-iit-ropar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="size-10 hover:scale-110 transition duration-300" />
              </a>

              <a
                href="https://www.instagram.com/ecell_iitrpr/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaSquareInstagram className="size-10 hover:scale-110 transition duration-300" />
              </a>
            </div>
          </div>


          {/* EVENTS */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Events</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="hover:cursor-pointer">Upcoming Events</li>
              <li className="hover:cursor-pointer">Past Events</li>
              <li className="hover:cursor-pointer">Submit Event</li>
            </ul>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Useful Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="hover:cursor-pointer" onClick={() => router.push("/E-Summit")}>Home</li>
              <li className="hover:cursor-pointer" onClick={() => router.push("/E-Summit/events")}>Events</li>
              <li className="hover:cursor-pointer" onClick={() => router.push("/E-Summit/team")}>Our Team</li>
              <li className="hover:cursor-pointer" onClick={() => router.push("/E-Summit/sponsorship")}>Sponsors</li>
              <li className="hover:cursor-pointer" onClick={() => router.push("/E-Summit/ca")}>Campus Ambassador</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <MapPinIcon /> IIT Ropar,India
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90 mt-2">
              <Mail /> ecell@iitrpr.ac.in
            </div>
          </div>
        </div>
      </footer>

      {/* COPYRIGHT */}
      <div className="bg-black text-white text-center py-4 text-sm">
        © E-Summit 2026. All rights reserved.
      </div>
    </div>
  );
}
