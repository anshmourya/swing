import { useContext } from "react";
import { CartData } from "../../hooks/Cart";
import ProductCard from "../../components/generalCoponents/card/ProductCard";
import Nav from "../../components/generalCoponents/navBar/Nav";
import axios from "axios";

const Cart = () => {
  const { cartItems, cartItemsData } = useContext(CartData);

  //sending the post request for the payment available in the card.
  const Payment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/payment`,
        {
          item: cartItems.filter((item) => item.cartItems > 0),
        }
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      {/* {!---------!} */}
      <div className="container flex items-start justify-center m-auto max-lg:flex-col">
        {/* {!---------!} */}

        <div className="lg:w-[70%]">
          {cartItems &&
            cartItems.map(
              (item) =>
                item.cartItems !== 0 && (
                  <ProductCard
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    id={item.id}
                    wholeData={item}
                  />
                )
            )}
        </div>
        {/* {!---------!} */}

        <SubTotal SubTotalData={cartItemsData} onPayment={Payment} />
      </div>
    </>
  );
};

export default Cart;

function SubTotal({ SubTotalData, onPayment }) {
  const { items, price } = SubTotalData || 0;
  return (
    <div className="flex-1 w-full p-6 mt-6 bg-white border rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <p className="text-gray-700">Total Item</p>
        <p className="text-gray-700">{items}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700"> &#8377; {price}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">&#8377; {price} INR</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>

      <button
        className="mt-6 w-full rounded-md bg-orange-400 py-1.5 font-medium text-white hover:shadow-md"
        onClick={onPayment}
      >
        Check out
      </button>
    </div>
  );
}
