import { createContext, useState, useEffect } from "react";

export const CartData = createContext();

export const CartDataProvider = ({ children }) => {
  //using to store the totalPirce and totalItem data
  const [cartItemsData, setCartItemsData] = useState();

  //getting cart data form localstorage or setting it to []
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  //handel cart it can handel both add and remove items by getting the current item and itemquantity to set.
  const handelCart = (data, itemQuantity) => {
    const itemFound = cartItems.some((item) => item.id === data.id); //find the item in the cart
    let newData = []; //storing the new data
    if (itemFound) {
      newData = cartItems.map((item) => {
        //if item is already in the cart then loop through cart items and change that item quantity and total price accordingly

        if (item.id === data.id) {
          return {
            ...item,
            cartItems: itemQuantity,
            total: itemQuantity * item.price,
          };
        }

        return item;
      });
      //set the newdata to the cartItems
      setCartItems(newData);
    } else {
      //if item is not in the cart then create the new item and set the total price and itemQuantity accordingly
      newData = {
        ...data, //getting data from the parameter
        cartItems: itemQuantity,
        total: itemQuantity * data.price,
      };

      setCartItems((prev) => [...prev, newData]);
    }
  };

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

  //sending the cartitems to the localstorage every time cartitems changes.
  useEffect(() => {
    getCartData();
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartData.Provider
      value={{
        handelCart,
        cartItems,
        cartItemsData,
        setCartItemsData,
      }}
    >
      {children}
    </CartData.Provider>
  );
};
