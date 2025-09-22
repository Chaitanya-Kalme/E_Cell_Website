"use client";
import React, { useContext, useState } from "react";
import { dataContext } from "@/context/dataContext";
import ContactCard from "@/components/contactCards";

const contact = () => {
  const { coreTeam, teamMembers } = useContext(dataContext);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Meet Our Team</h1>
      <div className="flex justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 justify-items-center items-center">
          {coreTeam.map((member, index) => (
            <ContactCard key={index} member={member} />
          ))}
        </div>
      </div>
      <div className="flex justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 items-center justify-center auto-rows-max">
          {teamMembers.map((member, index) => (
            <ContactCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default contact;
