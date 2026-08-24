"use client";
import { createContext, useState, useEffect } from "react";
import {
  coreTeamMembers2026,
  headMembers2026,
  coordinatorMembers2026,
  coreTeamMembers2025,
  headMembers2025,
  coordinatorMembers2025,
  demoBlogs,
} from "./TeamData";

export const dataContext = createContext();

const teamByYear = {
  2026: {
    coreTeam: coreTeamMembers2026,
    heads: headMembers2026,
    coordinators: coordinatorMembers2026,
  },
  2025: {
    coreTeam: coreTeamMembers2025,
    heads: headMembers2025,
    coordinators: coordinatorMembers2025,
  },
};

export const DataProvider = ({ children }) => {

  const [selectedYear, setSelectedYear] = useState(2026);
  const [blogs, setblogs] = useState(demoBlogs);

  const { coreTeam, heads, coordinators } = teamByYear[selectedYear];

  const value = {
    coreTeam,
    heads,
    coordinators,
    teamMembers: [...heads, ...coordinators],
    blogs,
    selectedYear,
    setSelectedYear,
  };
  return (
    <dataContext.Provider value={value}>{children}</dataContext.Provider>
  );
};