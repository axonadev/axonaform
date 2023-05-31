import React, { useState, useEffect } from "react";
const useLogin = () => {
  const [isLogged, setIsLogged] = useState(false);

  const getLogged = () => {
    const expirationTime = localStorage.getItem("adk_exptime");
    const token = localStorage.getItem("adk_token");
    if (token) {
      if (expirationTime) {
        const nowexpirationTime = new Date(new Date().getTime() * 1000);
        if (expirationTime < nowexpirationTime) {
          setIsLogged(false);
          return false;
        } else {
          setIsLogged(true);
          return true;
        }
      }
    } else {
      setIsLogged(false);
      return false;
    }
  };

  useEffect(() => {
    getLogged();
  }, []);

  return {
    isLogged,
    getLogged,
  };
};
export default useLogin;
