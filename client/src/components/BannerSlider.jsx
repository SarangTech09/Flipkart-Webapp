import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d10646f317bc57f5.jpg",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/957b83213656304b.jpg",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/8b6d6e715732a857.jpeg",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/dac9441632b8e18b.jpeg"
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[180px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden bg-gray-100 my-4 rounded-md shadow-sm">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full hover:bg-opacity-100 transition-all shadow-md hover:scale-110"
        aria-label="Previous banner"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full hover:bg-opacity-100 transition-all shadow-md hover:scale-110"
        aria-label="Next banner"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-gray-400 bg-opacity-50"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;