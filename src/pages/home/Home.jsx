import { useContext, useEffect, useState } from "react";

import MainCard from "../../components/generalCoponents/card/MainCard";
import Nav from "../../components/generalCoponents/navBar/Nav";
import { AllData } from "../../hooks/Data";
import FilterModal from "../../components/filter/FilterModal";
import FilterTab from "../../components/filter/FilterTab";
import { FilterData } from "../../hooks/Filter";

const Home = () => {
  const { getData, products } = useContext(AllData); //getting the data from AllData context
  const [visibleData, setVisibleData] = useState(products); // storing the data based on the active filters and mapiing over it to render it
  const { sortFilter, activeFilter, filterBySort, filterByRate } =
    useContext(FilterData);

  // running the useEffect to get the data in first render getdata storing the data in PRODUCTS state
  useEffect(() => {
    getData();
  }, []);

  //ruunning the useEffect to get the visible data according to the active filters and mapi over it to render the data
  useEffect(() => {
    //setting the newData first performing the the filter function and then sorting. and if there is not active filter it will retutn to the origanal data [      setVisibleData(products);]

    if (sortFilter !== "" || activeFilter.length > 0) {
      let newData = [...products];
      newData = filterByRate(newData, activeFilter);
      newData = filterBySort(newData, sortFilter);
      setVisibleData([...newData]);
    } else {
      setVisibleData(products);
    }
  }, [products, activeFilter, sortFilter]);
  return (
    <>
      <Nav />
      <FilterTab />
      <FilterModal />
      <div className="container grid grid-cols-1 m-auto place-items-center md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products.length > 0 &&
          visibleData &&
          visibleData.map((item) => (
            <MainCard
              key={item.id}
              time={item.delivery_time}
              title={item.title}
              rating={item.rating}
              price={item.price}
              image={item.image}
              id={item.id}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
