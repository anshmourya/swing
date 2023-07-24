import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

const Form = ({ title, onClickFunction }) => {
  return (
    <>
      <div className="bg-black">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div
            className="w-[430px]  p-12 rounded-lg"
            style={{ background: "rgba(0,0,0,.75)" }}
          >
            <h1 className="text-3xl text-white ">{title || "Sign Up"}</h1>
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

            <p className="my-4 text-gray-400">
              {title === "Sign In" ? "New To Swing?" : "Already Have Account?"}{" "}
              <span className="text-white cursor-pointer hover:border-b">
                <Link to={title === "Sign In" ? "/signup" : "/signin"}>
                  {title === "Sign In" ? "Sign Up Now" : "Sign In Now"}
                </Link>
              </span>
            </p>

            <button
              className="flex items-center justify-center w-full gap-2 p-2 my-4 text-gray-400 border rounded-md"
              onClick={onClickFunction}
            >
              <BsGoogle /> {title} with google
            </button>

            <p className="text-sm text-gray-400">
              This page is protected by Google reCAPTCHA to ensure you&apos;re
              not a bot.{" "}
              <span className="font-semibold text-blue-700 cursor-pointer">
                Learn more.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
