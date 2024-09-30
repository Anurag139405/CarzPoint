"use client";
import React, { useEffect, useState } from "react";

interface CarMedia {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  type: string;
}

interface Pagination {
  total: number;
  currentPage: number;
  pageSize: number;
}

interface DataResponse {
  carMediaList: CarMedia[];
  pagination: Pagination;
}

const API_URL =
  "https://api-prod.autochek.africa/v1/inventory/car_media?carId=R1nVTV4Mj";

const CarMediaGallery: React.FC = () => {
  const [data, setData] = useState<DataResponse>({
    carMediaList: [],
    pagination: { total: 0, currentPage: 1, pageSize: 100 },
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const json: DataResponse = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow-lg">
            Car Media Gallery
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-700">
            Loading...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.carMediaList.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                {item.type.startsWith("image") ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  >
                    <source src={item.url} type={item.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white rounded-b-lg">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CarMediaGallery;
