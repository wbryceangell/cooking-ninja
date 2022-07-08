import React, { createContext } from "react";

export const ThemeContext = createContext({color: "blue"});

type Props = React.PropsWithChildren & {};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{color: "blue"}}>
      {children}
    </ThemeContext.Provider>
  );
};
