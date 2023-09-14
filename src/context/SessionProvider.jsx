import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

// Create a context for the user session
const SessionContext = createContext();

// Create a SessionProvider component
export const SessionProvider = ({ children }) => {
  // State to manage userSession, initially set to true
  const [userSession, setUserSession] = useState(true);

  // Function to set userSession to false and delete the access_token cookie
  const handleSessionExpired = () => {
    // Set userSession to false
    setUserSession(false);

    // Delete the access_token cookie
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <SessionContext.Provider value={{ userSession, handleSessionExpired }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to access the session context
export const useSession = () => {
  return useContext(SessionContext);
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
