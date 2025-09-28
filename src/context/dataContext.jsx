"use client";
import { createContext, useState, useEffect } from "react";
import { coreTeamMembers, headMembers, coordinatorMembers, demoBlogs } from "./demoData";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  
  const [coreTeam, setcoreTeams] = useState(coreTeamMembers);
  const [heads, setheads] = useState(headMembers);
  const [coordinators, setcoordinators] = useState(coordinatorMembers);
  const [blogs, setblogs] = useState(demoBlogs);
  
  // Values to be provided to all child components
  const value = {
    coreTeam,
    heads,
    coordinators,
    teamMembers: [...heads, ...coordinators],
    blogs,
  };
  return (
    <dataContext.Provider value={value}>{children}</dataContext.Provider>
  );
};
