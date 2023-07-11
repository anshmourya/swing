import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocation } from "../../../helper/Location";
import Navlist from "./Navlist";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { BsBox2 } from "react-icons/bs";
const Nav = () => {
  //navdata to render navlist dynamically`
  const navData = [
    { title: "search", icon: CiSearch, link: "/store" },
    { title: "Offer", icon: MdOutlineLocalOffer, link: "/offer" },
    { title: "User", icon: BsFillPersonFill, link: "/user" },
    // { title: "Cart", icon: AiOutlineShoppingCart, link: "/cart" },
  ];
  const [geoData, setGeoData] = useState({});
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getLocation();
        setGeoData(data);
        console.log(geoData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <nav className="p-5 border ">
      <div className="container flex items-center justify-around gap-4 m-auto">
        <div className="transition-all cursor-pointer logo hover:scale-125">
          LOGO
        </div>
        <span className="text-sm transition-all cursor-pointer hover:text-gray-400">
          {/* {to display only short address , split to get add in array silice to get index from 0 to 3 and join to convert from array to string} */}
          {geoData && geoData.formatted_address
            ? geoData.formatted_address.split(",").slice(0, 4).join(",")
            : "Loading address...."}
        </span>

        <ul className="flex justify-end flex-1 gap-16">
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
            <li className="relative flex items-center justify-around gap-2 text-lg font-semibold transition-all cursor-pointer hover:text-orange-400">
              <BsBox2 className="text-xl fill-green-500 stroke-slate-950" />
              Cart
              <span className="absolute top-[8px] left-[6px] text-xs ">6</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
