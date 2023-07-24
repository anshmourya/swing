import Form from "../../components/form/Form";

const SignUp = () => {
  const googleSignUp = () => {
    console.log("performing google signUp");
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };
  return <Form title={"SignUp"} onClickFunction={googleSignUp} />;
};

export default SignUp;
