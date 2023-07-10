import { useState } from "react";
import { Skeleton } from "@mui/material";
import Cart from "../buttons/Cart";

const ProductCard = ({ title, price, image, wholeData }) => {
  const [imageError, setImageError] = useState(false);

  //handeling error if the url is wrong or url is undefined , the skelton will show.
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      {/* !-------------! */}

      <div className="flex items-center justify-center gap-4 px-5 py-5 content">
        {/* !-------------! */}

        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            className="w-[6rem] h-[6rem] rounded-lg cursor-pointer object-cover lg:w-[8rem] lg:h-[8rem]"
            onError={handleImageError} //handel error
            loading="lazy"
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={window.innerWidth < 647 ? "6rem" : "8rem"}
            height={window.innerWidth < 647 ? "6rem" : "8rem"}
            sx={{ borderRadius: "8px" }}
          />
        )}

        {/* !-------------! */}
        <div className="max-sm:flex-1 ">
          <h1 className="text-xl font-semibold cursor-pointer max-sm:text-lg">
            {title}
          </h1>
          {/* !-------------! */}
          <div className="flex items-center justify-between">
            <h6 className="font-light leading-8">₹{price}</h6>
            {/* cart button(component) with all the functionalty in it */}
            <Cart data={wholeData} />
          </div>

          {/* !-------------! */}
          <h6 className="leading-5 lg:w-[80%] max-sm:text-xs">
            Richly flavored aromatic rice layered with marinated chicken pieces
            in a delicate blend of whole spices.
          </h6>
        </div>

        {/* !-------------! */}
      </div>
    </>
  );
};

export default ProductCard;
