import { useEffect, useState } from "react";
import { getLocation } from "../../../helper/HelperFunction";
import Navlist from "./Navlist";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Nav = () => {
  //navdata to render navlist dynamically`
  const navData = [
    { title: "search", icon: CiSearch, link: "/store" },
    { title: "Offer", icon: MdOutlineLocalOffer, link: "/offer" },
    { title: "User", icon: BsFillPersonFill, link: "/user" },
    { title: "Cart", icon: AiOutlineShoppingCart, link: "/cart" },
  ];
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
      <div className="container flex items-center justify-around gap-4 m-auto">
        <div className="transition-all cursor-pointer logo hover:scale-125">
          LOGO
        </div>
        <span className="text-sm transition-all cursor-pointer hover:text-gray-400">
          {geoData.formatted_address}
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
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
