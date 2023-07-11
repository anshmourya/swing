import { Link } from "react-router-dom";
import { memo } from "react";

const Navlist = ({ link, title, Icon }) => {
  return (
    <Link to={link || "/"}>
      <li className="flex items-center justify-around gap-2 text-lg font-semibold transition-all cursor-pointer hover:text-orange-400">
        <Icon className="text-xl" />
        {title}
      </li>
    </Link>
  );
};

export default memo(Navlist);
