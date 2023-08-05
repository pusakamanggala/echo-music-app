import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getAccessTokenFromCookie = () => {
      const cookies = document.cookie;
      const cookieArray = cookies.split(";");

      for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();

        if (cookie.startsWith("access_token=")) {
          const accessTokenValue = cookie.split("=")[1];
          setAccessToken(accessTokenValue);
          break;
        }
      }
    };

    getAccessTokenFromCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
