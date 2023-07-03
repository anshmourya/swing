import { useContext, useState } from "react";
import MainCard from "../../components/generalCoponents/card/MainCard";
import Nav from "../../components/generalCoponents/navBar/Nav";
import { AllData } from "../../hooks/Data";

const Home = () => {
  const { getData, products } = useContext(AllData);
  useState(() => {
    getData();
  }, [products]);
  return (
    <>
      <Nav />
      <div className="container grid grid-cols-1 m-auto place-items-center md:grid-cols-2 lg:grid-cols-3">
        {products &&
          products.length > 0 &&
          products.map((item) => (
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
