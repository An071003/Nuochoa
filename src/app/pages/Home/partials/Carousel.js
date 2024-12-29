import React, { useState, useEffect } from "react";

export default function Carousel() {
    const images = [
        "https://maisonduparfumstore.com/cdn/shop/files/z4594728769584_dd638b564f2a4ed4c03d5cd7c3e2b448.jpg?v=1730698283&width=3000",
        "https://maisonduparfumstore.com/cdn/shop/files/z6121264946017_1fb85c45d10571dd866c91d727a394f7.jpg?v=1734923469&width=3000",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Auto slide - adjusted to prevent resetting the interval on every change
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="w-full mx-auto z-9">
            {/* Images Wrapper */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-auto object-cover flex-shrink-0"
                            role="img"
                        />
                    ))}
                </div>
            </div>

            {/* Controls and Indicators Wrapper */}
            <div className="mt-6 flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center space-x-4">
                    {/* Previous Button */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        className="text-slate-400 p-2 hover:text-slate-600"
                    >
                        ❮
                    </button>

                    {/* Indicators */}
                    <div className="flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-black" : "bg-gray-400"}`}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        className="text-slate-400 p-2 hover:text-slate-600"
                    >
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
}