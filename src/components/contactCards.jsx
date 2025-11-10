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
      className="relative w-54 h-64 bg-white dark:bg-gray-800 border-4 border-blue-700 dark:border-orange-200 rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl mx-4 my-6"
      onClick={handleCardClick} // handle mobile click
    >
      {/* Default state content */}
      <div
        className={`flex flex-col items-center justify-center h-full p-6 transition-opacity duration-300 ${
          isActive ? "opacity-0" : "opacity-100"
        } group-hover:opacity-0`}
      >
        {/* Profile picture */}
        <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-blue-700 dark:border-orange-200">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Name and position */}
        <h3 className="text-blue-700 dark:text-orange-200 text-xl font-bold text-center mb-2">
          {name}
        </h3>
        <p className="text-blue-600 dark:text-orange-300 text-center font-medium">
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
          style={{ backgroundImage: `url(${image})`, width: "100%", height: "100%" }}
        >
          {/* Overlay for better icon visibility */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-10"></div>
        </div>

        {/* Icons container */}
        <div className="absolute inset-0 flex items-center justify-center space-x-8 z-20">
          <a
            href={`mailto:${email}`}
            className="p-3 bg-white dark:bg-orange-100 bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-6 h-6 text-blue-700 dark:text-orange-700" />
          </a>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white dark:bg-orange-100 bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 hover:scale-110 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="w-6 h-6 text-blue-700 dark:text-orange-700" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
