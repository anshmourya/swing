import { Link } from "react-router-dom";

const Navlist = ({ link, title, Icon }) => {
  return (
    <Link to={link || "/"}>
      <li className="flex items-center justify-around gap-2 text-lg font-semibold transition-all cursor-pointer hover:text-orange-400">
        <Icon />
        {title}
      </li>
    </Link>
  );
};

export default Navlist;