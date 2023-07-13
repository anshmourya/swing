import { useContext, useEffect, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartData } from "../../hooks/Cart";

const AllCartItemTotal = () => {
  const { cartItems, cartItemsData, setCartItemsData } = useContext(CartData); //getting the cart data from the cart context

  //function to get the totalPrice and totalItem
  const getCartData = () => {
    let price = 0,
      items = 0;
    cartItems.forEach((item) => {
      price = item.total + price;
      items = items + item.cartItems;
    });
    //after setting the totalPrice and totalItem reset the price and items to zero
    setCartItemsData({ price: price, items: items });
  };

  useEffect(() => {
    getCartData();
    ``;
  }, [cartItems]);
  return (
    <>
      {/* {showing the componets once the price is greater than zero} */}
      {cartItemsData && cartItemsData.price > 0 && (
        <div className="fixed bottom-0 w-full m-auto text-center ">
          <div className="flex justify-between p-2 m-auto font-semibold text-white bg-green-500 border max-md:w-[100%] w-[45%]">
            <h1>
              {cartItemsData.items} item | &#8377;{cartItemsData.price}
            </h1>

            <Link to={"/cart"}>
              <h1 className="flex items-center gap-2 cursor-pointer">
                VIEW CART <BsBagCheck />
              </h1>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCartItemTotal;
