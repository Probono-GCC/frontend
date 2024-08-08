import React, { createContext, useContext } from "react";
import { useMediaQuery } from "@mui/material";

const MediaQueryContext = createContext();

export const MediaQueryProvider = ({ children }) => {
  const isSmallScreen = useMediaQuery("(max-width:880px)");
  const isSmallWidth = useMediaQuery("(max-width:367px)");

  return (
    <MediaQueryContext.Provider value={{ isSmallScreen, isSmallWidth }}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQueryContext = () => {
  const context = useContext(MediaQueryContext);
  if (context === undefined) {
    throw new Error(
      "useMediaQueryContext must be used within a MediaQueryProvider"
    );
  }
  return context;
};
