import React, { useState, useEffect } from "react";

export default function Carousel() {
    const images = [
        "https://maisonduparfumstore.com/cdn/shop/files/z6121264946017_1fb85c45d10571dd866c91d727a394f7.jpg?v=1734923469&width=3000",
        // You can add more images here
        // "https://example.com/image2.jpg",
        // "https://example.com/image3.jpg",
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

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full mx-auto z-10">
            {/* Images Wrapper */}
            <div className="overflow-hidden w-full h-full">
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
                            className="w-full h-full object-cover flex-shrink-0"
                            role="img"
                        />
                    ))}
                </div>
            </div>

            {/* Controls and Indicators Wrapper */}
            <div className="absolute top-1/2 w-full flex justify-between items-center px-4">
                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="text-white p-3 bg-gray-500 bg-opacity-50 rounded-full hover:bg-gray-600"
                >
                    ❮
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="text-white p-3 bg-gray-500 bg-opacity-50 rounded-full hover:bg-gray-600"
                >
                    ❯
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-black" : "bg-gray-400"}`}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
