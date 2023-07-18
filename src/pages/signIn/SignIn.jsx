import { useContext } from "react";
import Form from "../../components/form/Form";
import { Auth } from "../../hooks/Auth";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(Auth);
  console.log(isAuthenticated);
  return !isAuthenticated ? <Form /> : navigate("/");
};

export default SignIn;
