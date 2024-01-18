"use client";

import type { SectionName } from "@/types";
import React, { useState, createContext, useContext } from "react";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  isSectionVisible: boolean;
  setSectionVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [isSectionVisible, setSectionVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionName>("Home");

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        isSectionVisible,
        setSectionVisible,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider",
    );
  }

  return context;
}
