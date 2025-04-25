import React, { useEffect, useState } from "react";

const images = [
 
    "assets/banner/slide1.svg",
    "assets/banner/slide2.svg",
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            {/* Image Carousel */}
            <div className="absolute inset-0">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4 sm:px-6 md:px-8 lg:px-12">
                {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                    Relax. Rejuvenate. Refresh.
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-4 sm:mb-5 md:mb-6 max-w-2xl">
                    Book your perfect spa experience in just a few clicks.
                </p>
                <button className="bg-white text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow hover:bg-gray-200 transition text-xs sm:text-sm md:text-base">
                    Book Now
                </button> */}
            </div>

            {/* Controls */}
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/70 text-black p-1.5 sm:p-2 rounded-full hover:bg-white transition text-sm sm:text-base"
            >
                &#8592;
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/70 text-black p-1.5 sm:p-2 rounded-full hover:bg-white transition text-sm sm:text-base"
            >
                &#8594;
            </button>
        </div>
    );
};

export default HeroSection;
