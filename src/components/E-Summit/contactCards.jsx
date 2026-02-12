import React, { useState } from "react";
import { Mail, Linkedin } from "lucide-react";

const ContactCards = ({ member }) => {
  const { name, position, image, linkedin, email } = member;
  const [isActive, setIsActive] = useState(false);

  // Toggle hover state on mobile
  const handleCardClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="relative w-56 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:bg-white/15 mx-4 my-6"
      onClick={handleCardClick} // handle mobile click
    >
      {/* Default state content */}
      <div
        className={`flex flex-col items-center justify-center h-full p-6 transition-opacity duration-300 ${
          isActive ? "opacity-0" : "opacity-100"
        } group-hover:opacity-0`}
      >
        {/* Profile picture */}
        <div className="w-28 h-28 mb-3 overflow-hidden rounded-full border-2 border-blue-400/60">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Name and position */}
        <h3 className="text-blue-400 text-lg font-bold text-center mb-1">
          {name}
        </h3>
        <p className="text-gray-300/80 text-center text-sm font-medium px-2">
          {position}
        </p>
      </div>

      {/* Hover/click state content */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        } group-hover:opacity-100`}
      >
        {/* Expanded background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${image})`,
            width: "100%",
            height: "100%",
          }}
        >
          {/* Overlay for better icon visibility */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>
        </div>

        {/* Icons container */}
        <div className="absolute inset-0 flex items-center justify-center space-x-6 z-20">
          <a
            href={`mailto:${email}`}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110 shadow-lg border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-5 h-5 text-white" />
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110 shadow-lg border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
