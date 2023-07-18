import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [decodeData, setDecodeData] = useState(null);

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + 6000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
    setisAuthenticated(true);
    //   exdays * 24 * 60 * 60 * 1000
  };

  const checkIsLogin = () => {
    if (!isAuthenticated) return navigate("/signin");
  };

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    let token = null;
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        token = value;
      }
    });

    if (token) {
      // You can decode and use the token here
      const decodedToken = jwt_decode(token);
      setDecodeData(decodedToken);
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    console.log(decodeData);
  }, [decodeData, isAuthenticated]);
  return (
    <Auth.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        decodeData,
        setDecodeData,
        checkIsLogin,
        setCookie,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
