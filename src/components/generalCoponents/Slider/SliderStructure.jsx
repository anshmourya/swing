import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Btns from "../buttons/Btns";
const SliderStructure = ({
  element: Element,
  slidesPerView,
  speed,
  data,
  autoplay,
}) => {
  const swiperRef = useRef(null);
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView || 3}
        speed={speed}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={true}
        navigation={true}
        autoplay={autoplay || false}
        modules={[Autoplay, Navigation]}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Element data={item} />
          </SwiperSlide>
        ))}
        <Btns
          buttonTitle={<BsChevronLeft />}
          buttonStyle={"absolute z-10 top-[50%] left-0 text-lg"}
          onClickFuntion={() => swiperRef.current.slidePrev()}
        />
        <Btns
          buttonTitle={<BsChevronRight />}
          buttonStyle={"absolute z-10 top-[50%] right-14 text-lg"}
          onClickFuntion={() => swiperRef.current.slideNext()}
        />
      </Swiper>
    </>
  );
};

export default SliderStructure;
