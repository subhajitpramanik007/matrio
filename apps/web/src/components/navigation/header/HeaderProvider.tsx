"use client";

import React, { createContext, useCallback } from "react";

interface HeaderContextType {
  gameName: string | null;
  setGameName: (gameName: string) => void;
}

const HeaderContext = createContext<HeaderContextType | null>(null);

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameName, setGameName] = React.useState<string | null>(null);

  const onUpdateGameName = useCallback(
    (gameName: string) => {
      if (gameName) setGameName(gameName);
    },
    [setGameName],
  );

  return (
    <HeaderContext.Provider value={{ gameName, setGameName: onUpdateGameName }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = React.useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }
  return context;
};
