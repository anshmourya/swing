import Form from "../../components/form/Form";

const SignIn = () => {
  const googleLogin = () => {
    console.log("performing google login");
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };

  return <Form title={"Sign In"} onClickFunction={googleLogin} />;
};

export default SignIn;
