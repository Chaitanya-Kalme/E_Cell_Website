"use client";
import { createContext, useState, useEffect } from "react";
import { members } from "./demoData";


export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  
  const [teamMembers, setteamMembers] = useState(members)
  
  // Values to be provided to all child components
  const value = {
    teamMembers,
    setteamMembers
  };
  return (
    <dataContext.Provider value={value}>{children}</dataContext.Provider>
  );
};
