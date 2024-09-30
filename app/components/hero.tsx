"use client";
import React, { useEffect, useState } from "react";

interface CarMake {
  id: number;
  name: string;
  imageUrl: string;
}

const Carousel: React.FC = () => {
  const [carMakes, setCarMakes] = useState<CarMake[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        const response = await fetch(
          "https://api.staging.myautochek.com/v1/inventory/make?popular=true"
        );
        const data = await response.json();
        setCarMakes(data.makeList.slice(0, 5));
      } catch (error) {
        console.error("Error fetching car makes:", error);
      }
    };

    fetchCarMakes();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carMakes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carMakes.length) % carMakes.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {carMakes.map((carMake, index) => (
        <div
          key={carMake.id}
          className={`absolute inset-0 transition-opacity duration-400 ease-in-out ${
            currentSlide === index ? "bg-opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${carMake.imageUrl})`,
            backgroundSize: "50%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-15 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-black text-center">
            <strong className="text-red-500">The CarZ</strong> - The New Gen Car
            Market
          </h1>
          <span className="text-2xl font-medium mb-10 text-black">
            Where Innovation Meets Open Road: the New Generation of Cars!
          </span>
          <br />
          <button className="bg-blue-500 text-white px-6 py-2 mt-2 rounded">
            Shop Now
          </button>
        </div>
      </div>

      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
