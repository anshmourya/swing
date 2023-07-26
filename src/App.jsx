import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/productDetail/Detail";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import { useContext } from "react";
import { Auth } from "./hooks/Auth";

function App() {
  const { user } = useContext(Auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />

        {/* Protected Route - Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Public Route - SignIn */}
        <Route path="/signIn" element={<SignIn />} />

        {/* Public Route - SignUp */}
        <Route path="/signUp" element={<SignUp />} />

        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
