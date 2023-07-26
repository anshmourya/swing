import Axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  const getUser = async () => {
    try {
      const res = await Axios.get(
        `${import.meta.env.VITE_SERVER_URL}/success`,
        {
          withCredentials: true,
        }
      );
      if (res.data) setuser(res.data.user);
    } catch (error) {
      console.error("Couldn't get user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return <Auth.Provider value={{ user, getUser }}>{children}</Auth.Provider>;
};
