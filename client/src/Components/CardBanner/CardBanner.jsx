import React, { useState, useEffect } from "react";
import BookBanner from '../../assets/BookBanner1.jpg';
import BookBanner1 from '../../assets/BookBanner2.jpg';
import BookBanner2 from '../../assets/BookBanner3.jpg';


const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { url: BookBanner, title: "Slide 1" },
    { url: BookBanner1, title: "Slide 2" },
    { url: BookBanner2, title: "Slide 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] rounded-lg">
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 rounded-lg">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-fit"
              />
              {/* Optional overlay to ensure text visibility */}
            </div>
          ))}
        </div>
      </div>

      {/* Content overlay - you can add text/content here */}
      

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() =>
            setCurrentSlide(
              currentSlide === 0 ? slides.length - 1 : currentSlide - 1
            )
          }
          className="p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-colors"
          aria-label="Previous slide"
        >
        </button>
        <button
          onClick={() =>
            setCurrentSlide(
              currentSlide === slides.length - 1 ? 0 : currentSlide + 1
            )
          }
          className="p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-colors"
          aria-label="Next slide"
        >
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
