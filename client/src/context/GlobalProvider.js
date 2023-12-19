import React, { createContext } from "react";
import { useCookies } from "react-cookie";
export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [cookie, setCookie] = useCookies(["access_token"]);

  const values = { cookie, setCookie };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
