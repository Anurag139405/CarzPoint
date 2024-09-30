"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import CarMediaGallery from "@/app/components/carMediaGallery";

interface CarMake {
  id: number;
  name: string;
  imageUrl: string;
}

interface Pagination { 
  total: number;
  currentPage: number;
  pageSize: number;
}

interface DataResponse {
  makeList: CarMake[];
  pagination: Pagination;
}

const API_URL =
  "https://api.staging.myautochek.com/v1/inventory/make?popular=true";

const PaginationComponent: React.FC = () => {
  const [data, setData] = useState<DataResponse>({
    makeList: [],
    pagination: { total: 0, currentPage: 1, pageSize: 5 },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [allItems, setAllItems] = useState<CarMake[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const json: DataResponse = await response.json();
      setAllItems(json.makeList);
      setData({
        makeList: json.makeList,
        pagination: {
          total: json.makeList.length,
          currentPage: 1,
          pageSize: 5,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / data.pagination.pageSize);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setData((prevData) => ({
        ...prevData,
        pagination: { ...prevData.pagination, currentPage: page },
      }));
    }
  };

  const startIndex =
    (data.pagination.currentPage - 1) * data.pagination.pageSize;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + data.pagination.pageSize
  );

  return (
    <>
      <Navbar />
      <div className="p-4 bg-white">
        <div className="flex justify-end mb-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search makes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-indigo-500 bg-white text-black"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 text-black py-2 text-center">
                    Make
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-black text-center">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      No results found.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 bg-white text-center text-black px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 bg-white px-4 py-2">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 mx-auto"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
              <button
                onClick={() =>
                  handlePageChange(data.pagination.currentPage - 1)
                }
                disabled={data.pagination.currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-1 text-sm font-semibold ${
                      index + 1 === data.pagination.currentPage
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  handlePageChange(data.pagination.currentPage + 1)
                }
                disabled={data.pagination.currentPage === totalPages}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
      <CarMediaGallery />
      <Footer />
    </>
  );
};

export default PaginationComponent;
