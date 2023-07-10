import { useState, useRef, useEffect, useContext } from "react";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { CartData } from "../../../hooks/Cart";

const Cart = ({ data }) => {
  //using setTimeout and clearTimeout because if user clicks on add and remove continuously then it will be hard to call the handelCart on every click. so using the setTimeout and clearTimeout to prevent that behavior and calling the finction once user stops clicking  [calling after 500ms]

  const { handelCart, cartItems } = useContext(CartData); // getting the cart functionality and state from the cartData hook

  const [cartCount, setCartCount] = useState(0); //handling cart count changes
  const [clickTimeout, setClickTimeout] = useState(null); //storing the current timeout reference to delete that timeout
  const clickTimeoutRef = useRef(null); // reference to current timeout

  //!-------!
  const addCart = () => {
    //setting the cartCount
    setCartCount((prevCount) => prevCount + 1);
    //clearing the current timeout to prevent from unwanted output
    clearTimeout(clickTimeout);

    //setting the clickTimeout current reference with setTimeout
    clickTimeoutRef.current = setTimeout(() => {
      handelCart(data, cartCount + 1);
    }, 500);

    setClickTimeout(clickTimeoutRef.current); //setting the current reference of  setTimeout
  };

  const removeCart = () => {
    if (cartCount <= 0) {
      setCartCount(0);
    } else {
      //setting the cartCount
      setCartCount((prevCount) => prevCount - 1);
      //clearing the current timeout to prevent from unwanted output
      clearTimeout(clickTimeout);

      //setting the clickTimeout current reference with setTimeout
      clickTimeoutRef.current = setTimeout(() => {
        handelCart(data, cartCount - 1);
      }, 500);

      setClickTimeout(clickTimeoutRef.current); //setting the current reference of  setTimeout
    }
  };

  //clearing the timeout if exist
  useEffect(() => {
    return () => {
      clearTimeout(clickTimeout);
    };
  }, []);

  //getting the cart count from the cartItems collection if it exists set [cartCount] to that number or set it to 0
  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === data.id);
    if (cartItem) {
      setCartCount(cartItem.cartItems);
    }
  }, [cartItems, data.id]);

  return (
    <div className="flex items-center gap-2 p-1 text-sm text-gray-500 border rounded-lg">
      {/* {!----------!} */}
      <button onClick={removeCart}>
        <BiMinus />
      </button>

      {/* {!----------!} */}
      <button className="text-sm font-semibold text-green-500 ">
        {cartCount > 0 ? cartCount : "Add"}
      </button>

      {/* {!----------!} */}
      <button onClick={addCart} className="text-lg text-green-500">
        <BsPlus />
      </button>
    </div>
  );
};

export default Cart;
