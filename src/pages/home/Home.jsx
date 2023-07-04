import { useContext, useEffect, useState } from "react";
import { handelScroll } from "../../helper/Scroll";
import MainCard from "../../components/generalCoponents/card/MainCard";
import Nav from "../../components/generalCoponents/navBar/Nav";
import { AllData } from "../../hooks/Data";

const Home = () => {
  const itemsToShowInitially = 12; // number of items to show initially
  const itemsPerScroll = 6; // number of items to show per scroll
  const [visibleData, setVisibleData] = useState([]); //store the all visible data
  const { getData, products } = useContext(AllData);
  //calling the getData function to get the all product data1 available in the api
  useEffect(() => {
    getData();
  }, []);

  //set the inital value to show in the page , by using itemsToShowInitially
  useEffect(() => {
    if (products) {
      setVisibleData(products.slice(0, itemsToShowInitially));
    }
  }, [products]);

  useEffect(() => {
    //wraped the handelscroll in in varibale because to remove listener useeffect function itsel without paramenter
    const handleScroll = () => {
      handelScroll({
        visibleData,
        setVisibleData,
        data: products,
        itemsPerScroll,
      });
    };

    window.addEventListener("scroll", handleScroll); // invoing the scroll event

    return () => {
      window.removeEventListener("scroll", handleScroll); // remove listener
    };
  }, [visibleData, products, itemsPerScroll]);

  return (
    <>
      <Nav />
      <div className="container grid grid-cols-1 m-auto place-items-center md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products.length > 0 &&
          visibleData &&
          // {rendering the data based on the visibleData for infinite scrolling}
          visibleData.map((item) => (
            <MainCard
              key={item.id}
              time={item.delivery_time}
              title={item.title}
              rating={item.rating}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
