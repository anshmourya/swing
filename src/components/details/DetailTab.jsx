import { AiOutlineSearch } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
const DetailTab = ({ search, setSearch }) => {
  return (
    <>
      <div className="flex justify-between content px-2 items-center">
        <h1 className="text-2xl font-semibold max-sm:text-lg">Order Online</h1>
        <div className="flex items-center gap-2 p-2  border rounded-lg ">
          <AiOutlineSearch className="max-md:text-lg text-xl" />
          <input
            type="text"
            placeholder="Search within menu"
            className=" outline-none md:text-lg"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <RxCross1
            className="text-sm cursor-pointer"
            onClick={() => setSearch("")}
          />
        </div>
      </div>
    </>
  );
};

export default DetailTab;
