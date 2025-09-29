import React from "react";

export default function NavbarMenu() {
  return (
    <nav className="w-full bg-yellow-400 shadow-md py-4 border-b border-purple-700">
      <div className="container mx-auto flex justify-between items-center px-4">
        <span className="text-2xl font-extrabold text-purple-700 tracking-wide">
          E-Cell
        </span>
        <ul className="flex space-x-8 font-semibold text-lg">
          {["HOME", "ABOUT US", "INITIATIVES", "GALLERY", "CONTACT", "BLOGS"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-purple-700 hover:text-black transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="bg-gradient-to-r from-purple-700 to-white text-yellow-400 px-4 py-2 rounded-full shadow hover:from-purple-800 hover:to-white transition-colors font-bold"
            >
              JOIN US
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}