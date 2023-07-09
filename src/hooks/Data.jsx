import axios from "axios";
import { createContext, useState } from "react";

export const AllData = createContext();

export const AllDataprovider = ({ children }) => {
  const [products, setProducts] = useState();

  const getData = async () => {
    try {
      const res = await axios.get("/product");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDetails = async (id) => {
    try {
      const res = await axios.get(`/product/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AllData.Provider value={{ getData, products, getDetails }}>
      {children}
    </AllData.Provider>
  );
};
