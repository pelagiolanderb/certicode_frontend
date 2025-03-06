import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ images = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        autoplay={{ delay: 5000 }}
        speed={500}
        onSwiper={setSwiperInstance}
        className="w-full"
      >
        {images.length > 0 ? (
          images.map((src, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[400px] object-cover rounded-xl shadow-md"
              />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center w-full">No images available</p>
        )}
        <div className="swiper-pagination absolute bottom-4 flex justify-center gap-2"></div>
      </Swiper>

      <button
        ref={prevRef}
        className="absolute top-[50%] left-4 transform -translate-y-[50%] bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        ref={nextRef}
        className="absolute top-[50%] right-4 transform -translate-y-[50%] bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel;
