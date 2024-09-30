"use client";
import React, { useEffect, useState } from "react";
import CarDetailModal from "./CarDetailModal";

interface CarMake {
  id: number;
  name: string;
  imageUrl: string;
}

const ProductGrid: React.FC = () => {
  const [popularMakes, setPopularMakes] = useState<CarMake[]>([]);
  const [newMakes, setNewMakes] = useState<CarMake[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarMake | null>(null);
  const [carMedia, setCarMedia] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        const response = await fetch(
          "https://api.staging.myautochek.com/v1/inventory/make?popular=true"
        );
        const data = await response.json();

        const shuffledMakes = data.makeList.sort(() => 0.5 - Math.random());
        setPopularMakes(shuffledMakes.slice(0, 4));
        setNewMakes(shuffledMakes.slice(4, 8));
      } catch (error) {
        console.error("Error fetching car makes:", error);
      }
    };

    fetchCarMakes();
  }, []);

  const handleViewClick = async (carMake: CarMake) => {
    setSelectedCar(carMake);
    setAvailabilityMessage(null);
    try {
      const response = await fetch(
        `https://api-prod.autochek.africa/v1/inventory/car_media?carId=${carMake.id}`
      );
      const data = await response.json();

      if (data.carMediaList && data.carMediaList.length > 0) {
        setCarMedia(data.carMediaList);
      } else {
        setCarMedia([]);
        setAvailabilityMessage("Product not available");
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
      setAvailabilityMessage("Error fetching product details.");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCarMedia([]);
    setSelectedCar(null);
    setAvailabilityMessage(null);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-7xl pb-3 font-extrabold tracking-tight text-center text-[rgb(93,139,203)] font-serif">
          Popular Car Makes
        </h2>

        <div className="border border-gray-200 rounded-lg shadow-lg p-6 mb-16">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularMakes.map((carMake) => (
              <div
                key={carMake.id}
                className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-full transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <a
                  className="relative mx-3 mt-5 flex h-60 overflow-hidden rounded-xl"
                  href="#"
                >
                  <img
                    className="object-cover w-full h-full"
                    src={carMake.imageUrl}
                    alt={carMake.name}
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    Popular
                  </span>
                </a>
                <div className="mt-4 px-5 pb-5 flex-grow">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {carMake.name}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        5.0
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewClick(carMake)}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-7xl pb-3 font-extrabold tracking-tight text-center text-[rgb(93,139,203)] font-serif">
          New Car Makes
        </h2>

        <div className="border border-gray-200 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newMakes.map((carMake) => (
              <div
                key={carMake.id}
                className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-full transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <a
                  className="relative mx-3 mt-5 pt-2 flex h-60 overflow-hidden rounded-xl"
                  href="#"
                >
                  <img
                    className="object-cover w-full h-full"
                    src={carMake.imageUrl}
                    alt={carMake.name}
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    New
                  </span>
                </a>
                <div className="mt-4 px-5 pb-5 flex-grow">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">
                      {carMake.name}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        5.0
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewClick(carMake)}
                    className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CarDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        carMedia={carMedia}
        carName={selectedCar ? selectedCar.name : ""}
        carImage={selectedCar ? selectedCar.imageUrl : ""}
      />
    </div>
  );
};

export default ProductGrid;
