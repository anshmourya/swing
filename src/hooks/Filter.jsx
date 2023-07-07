import { useState, createContext } from "react";

export const FilterData = createContext();

export const FilterProvider = ({ children }) => {
  const [openTab, setOpenTab] = useState(false); //using this to open the filter modal
  const [sortFilter, setSortFilter] = useState(""); // using this to set this sort filter user choose
  const [activeFilter, setActiveFilter] = useState([]); // using this to store all the active filter user choose and apply accordingly

  const filterBySort = (data, type) => {
    let newData = [...data]; // copying the orignal data to perform the filtering
    switch (type) {
      case "Rating: High to Low":
        newData = newData.sort((a, b) => b.rating - a.rating);
        break;
      case "Delivery Time":
        newData = newData.sort((a, b) => a.delivery_time - b.delivery_time);
        break;
      case "Cost: Low to High":
        newData = newData.sort((a, b) => a.price - b.price);
        break;
      // Add more cases for other sorting options if needed
      default:
        break;
    }
    return newData;
  };
  //filtring the data based one the rate provide by the user, the two value are coming in {filter.value} [0,1] based on that the operation is performaing, every time there will be chnage in activefilter this function will run.
  const filterByRate = (data, filters) => {
    let filteredData = [...data];
    // {looping over the filter to apply alll the active filters}
    filters.forEach((filter) => {
      if (filter.type === "Rating") {
        filteredData = filteredData.filter(
          (item) =>
            item.rating > filter.value[0] && item.rating < filter.value[1]
        );
      } else {
        filteredData = filteredData.filter(
          (item) => item.price > filter.value[0] && item.price < filter.value[1]
        );
      }
    });
    return filteredData; //laslty returns filteredData
  };

  return (
    <FilterData.Provider
      value={{
        openTab,
        setOpenTab,
        filterBySort,
        filterByRate,
        sortFilter,
        setSortFilter,
        activeFilter,
        setActiveFilter,
      }}
    >
      {children}
    </FilterData.Provider>
  );
};
