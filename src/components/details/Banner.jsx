import Rating from "../generalCoponents/buttons/Rating";

const Banner = ({ title, rating }) => {
  return (
    <>
      <div className=" content px-2">
        {/* !----------! */}

        <div className="overflow-hidden">
          <img
            src="https://b.zmtcdn.com/data/pictures/chains/1/19642281/8553e35a6e73d9f06545894eba7b19f0.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"
            alt=""
            className="w-full h-[25rem] object-cover hover:scale-110  transition-all duration-1000  cursor-pointer"
          />
        </div>

        {/* !----------! */}

        <div className="flex justify-between cursor-pointer mt-9 items-center">
          <h1 className="text-lg font-semibold leading-3 lg:text-2xl">
            {title}
          </h1>
          <div className="flex gap-7">
            <Rating rating={4.2} />
            <Rating rating={rating} />
          </div>
        </div>
        {/* !----------! */}

        <div className="pb-10 my-3 border-b-2 cursor-pointer">
          <h6 className="text-lg font-light">
            North Indian, Chinese, Mughlai, Sichuan
          </h6>
          <h5 className="text-gray-500 my-2">Goregaon East, Mumbai</h5>
          <h5 className="text-sm my-2 text-gray-500">
            <span className="text-orange-400"> Open Now</span> 12midnight –
            1:30am, 9am – 12midnight (Today)
          </h5>
        </div>
        {/* !----------! */}
      </div>
    </>
  );
};

export default Banner;
