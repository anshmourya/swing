import { useContext, useEffect, useState } from "react";
//icons
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFillPersonFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { MdOutlineLocalOffer, MdOutlineArrowBack } from "react-icons/md";
//!-------!
//components
import Navlist from "./Navlist";
import { Drawer } from "@mui/material";
//!-------!
import { CartData } from "../../../hooks/Cart";
import { Link } from "react-router-dom";
import { getLocation } from "../../../helper/Location";

const Nav = () => {
  const { cartItemsData } = useContext(CartData);

  //navdata to render navlist dynamically`
  const navData = [
    { title: "search", icon: CiSearch, link: "/" },
    { title: "Offer", icon: MdOutlineLocalOffer, link: "/offer" },
    { title: "User", icon: BsFillPersonFill, link: "/user" },
  ];
  const [openNav, setOpenNav] = useState(false);
  const handelNav = () => setOpenNav(!openNav);

  //functions to get the real time location of the user
  const [geoData, setGeoData] = useState({});
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getLocation();
        setGeoData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <nav className="p-5 border ">
      {/*  !----------! */}
      <div className="container flex items-center justify-around gap-4 m-auto">
        {/*  !----------! */}

        <div className="transition-all cursor-pointer logo hover:scale-125">
          LOGO
        </div>
        {/*  !----------! */}

        <span className="text-sm font-semibold transition-all cursor-pointer hover:text-gray-400 max-sm:text-xs">
          {/* {to display only short address , split to get add in array silice to get index from 0 to 3 and join to convert from array to string} */}

          {geoData && geoData.formatted_address
            ? geoData.formatted_address.split(",").slice(0, 4).join(",")
            : "Loading address...."}
        </span>

        <span className="hidden cursor-pointer max-lg:inline ">
          <RxHamburgerMenu onClick={handelNav} />
        </span>
        {/* nav body for the laptop and larger screen devices */}

        <ul className="flex justify-end flex-1 gap-16 max-lg:hidden">
          <NavBody navData={navData} cartItemsData={cartItemsData} />
        </ul>

        {/* nav body for the mobile and smaller screen devices */}

        {openNav && (
          <Drawer anchor="right" open={openNav}>
            <span onClick={handelNav} className="float-left m-5 cursor-pointer">
              <MdOutlineArrowBack className="text-lg" />
            </span>
            <div className="grid items-center w-64 h-screen place-items-center">
              <ul className="grid gap-16">
                <NavBody navData={navData} cartItemsData={cartItemsData} />
              </ul>
            </div>
          </Drawer>
        )}

        {/*  !----------! */}
      </div>
    </nav>
  );
};

export default Nav;

function NavBody({ navData, cartItemsData }) {
  return (
    <>
      {/* rendering list using NavData */}
      {navData.map((item, index) => (
        <Navlist
          key={index}
          title={item.title}
          Icon={item.icon}
          link={item.link}
        />
      ))}
      <Link to={"/cart"}>
        <li className="relative flex items-center gap-2 text-lg font-semibold transition-all cursor-pointer hover:text-orange-400">
          <BsBox2
            className={`text-xl ${cartItemsData ? "fill-green-500" : ""}`}
          />
          Cart
          {cartItemsData && (
            <span className="absolute top-[8px] left-[6px] text-xs font-bold ">
              {cartItemsData.items}
            </span>
          )}
        </li>
      </Link>
    </>
  );
}
