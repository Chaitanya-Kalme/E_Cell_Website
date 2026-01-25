"use client";
import React, { useContext } from "react";
import ContactCard from "@/components/E-Summit/contactCards";
import { dataContext } from "@/context/E-Summit/dataContext";

const ourTeam = () => {
  const { coreTeam, teamMembers } = useContext(dataContext);
  
  return (
    <div className="container mx-auto py-8 min-h-screen mt-24">
      <h1 className="text-5xl font-bold text-center mb-12 text-blue-700 dark:text-orange-300">
        MEET OUR TEAM
      </h1>
      
      <div className="flex justify-around">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 justify-items-center items-center">
          {coreTeam.map((member, index) => (
            <ContactCard key={index} member={member} isOC={true} />
          ))}
        </div>
      </div>
      
      <div className="flex justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 items-center justify-center auto-rows-max">
          {teamMembers.map((member, index) => (
            <ContactCard key={index} member={member} isOC={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ourTeam;