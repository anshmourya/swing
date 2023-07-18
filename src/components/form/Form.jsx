import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { Auth } from "../../hooks/Auth";

const Form = ({ title }) => {
  const { setCookie } = useContext(Auth);
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex flex-col items-center justify-center ">
          <div
            className="w-[430px]  p-12 rounded-lg"
            style={{ background: "rgba(0,0,0,.75)" }}
          >
            <h1 className="text-3xl text-white ">Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              className="block h-12 m-auto my-4 w-[100%] outline-none p-3 rounded-lg bg-gray-700  text-white"
            />
            <input
              type="password"
              placeholder="password"
              className="block h-12 m-auto my-4 w-[100%] outline-none p-3 rounded-lg bg-gray-700 text-white"
            />

            <button className="w-full h-12 text-sm text-center text-white bg-red-600 rounded-lg">
              {title === "Sign In" ? "Sign In" : "Sign Up"}
            </button>

            <p className="my-3 text-sm text-gray-400">
              This page is protected by Google reCAPTCHA to ensure you&apos;re
              not a bot.{" "}
              <span className="font-semibold text-blue-700 cursor-pointer">
                Learn more.
              </span>
            </p>
          </div>
          {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_KEY}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                setCookie("token", credentialResponse.credential, 1);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </GoogleOAuthProvider> */}
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Form;
