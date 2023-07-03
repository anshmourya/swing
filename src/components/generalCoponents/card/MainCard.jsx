import { useState } from "react";
import { Skeleton } from "@mui/material";
import Rating from "../buttons/Rating";

const MainCard = ({ title, price, rating, time, image }) => {
  const [imageError, setImageError] = useState(false);

  //handeling error if the url is wrong or url is undefined , the skelton will show.
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      <div className="">
        <div className="max-w-[296px] max-h-[400px] p-3 product-card border border-transparent transition-all cursor-pointer my-3">
          {image && !imageError ? (
            <img
              src={image}
              alt={title}
              className="w-[254px] h-[160px] object-contain m-auto rounded-md"
              onError={handleImageError} //handel error
            />
          ) : (
            <Skeleton variant="rectangular" width={254} height={160} />
          )}

          <span className="block my-2 text-lg font-semibold">{title}</span>
          <span className="block mb-5 text-sm text-gray-400">
            Pizza, Fast Food, Beverag
          </span>
          <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
            {/* //fixing the numbe to the only one Number */}
            <Rating rating={rating.toFixed(1)} />
            <span className="text-xs font-normal">{time} MINS</span>{" "}
            <span className="text-xs font-normal">
              &#8377; {price * 2} FOR TWO
            </span>
          </div>
          <button className="text-blue-600 font-bold border-t w-[100%] mt-6 p-2 cart transition-all text-sm">
            QUICK VIEW
          </button>
        </div>
      </div>
    </>
  );
};

export default MainCard;
