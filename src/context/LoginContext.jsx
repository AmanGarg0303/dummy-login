import { createContext, useContext, useEffect, useState } from "react";

const LoginContext = createContext();

export const useLoginData = () => {
  return useContext(LoginContext);
};

export const LoginContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("unstop_data")
  );

  useEffect(() => {
    localStorage.setItem("unstop_data", loginData);
  }, [loginData]);

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};
