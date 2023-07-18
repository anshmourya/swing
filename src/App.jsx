import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/productDetail/Detail";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/signIn/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signIn" element={<SignIn />} />
        {/* <Route path="/signUp" element={<SignUp />} /> */}
      </Routes>
    </>
  );
}

export default App;
