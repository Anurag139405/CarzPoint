"use client";
import React, { useState } from "react";
const Menu: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const carBrands = [
    "Audi",
    "BMW",
    "Honda",
    "Hyundai",
    "Jaguar",
    "Land Rover",
    "Lexus",
    "Mercedes-Benz",
    "Nissan",
    "Toyota",
    "Volkswagen",
  ];

  return (
    <nav className="bg-gray-300 border-gray-400 dark:bg-gray dark:border-gray-700 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="relative">
          <button
            onClick={() => toggleDropdown("categories")}
            className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-200 border rounded-md p-2"
          >
            <span className="self-center text-1xl font-semibold whitespace-nowrap text-black">
              All Categories
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
                fill="black"
              />
            </svg>
          </button>

          {openDropdown === "categories" && (
            <div className="absolute z-10 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <ul className="py-2">
                {carBrands.map((brand) => (
                  <li
                    key={brand}
                    className="px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-black dark:hover:bg-gray-700 dark:focus:ring-black"
          aria-controls="navbar-multi-level"
          aria-expanded={openDropdown ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-400 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <a
                href="/home"
                className="block py-2 px-3 text-b rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-black dark:hover:text-black md:dark:hover:bg-transparent"
              >
                Home
              </a>
            </li>

            <li>
              <button
                onClick={() => toggleDropdown("petrol")}
                className="flex items-center justify-between w-full py-2 px-3 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:focus:text-black dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-haspopup="true"
              >
                Petrol Cars
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {openDropdown === "petrol" && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white">
                  <ul className="py-2 text-sm text-black dark:text-black">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        BMW (M series)
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        Audi (S and RS models)
                      </a>
                    </li>
                    {carBrands.slice(0, 6).map((brand) => (
                      <li key={brand}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                        >
                          {brand}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li>
              <button
                onClick={() => toggleDropdown("diesel")}
                className="flex items-center justify-between w-full py-2 px-3 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:focus:text-black dark:hover:bg-white md:dark:hover:bg-transparent"
                aria-haspopup="true"
              >
                Diesel Cars
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {openDropdown === "diesel" && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white">
                  <ul className="py-2 text-sm text-black dark:text-black">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        Nissan
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        Toyota
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        Honda
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        Hyundai
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <button
                onClick={() => toggleDropdown("electric")}
                className="flex items-center justify-between w-full py-2 px-3 text-black hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:focus:text-black dark:hover:bg-white md:dark:hover:bg-transparent"
                aria-haspopup="true"
              >
                Electric Cars
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {openDropdown === "electric" && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white">
                  <ul className="py-2 text-sm text-black dark:text-black">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        Tesla
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        BMW (i Series)
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100"
                      >
                        Audi (e-tron)
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <a
                href="/lists"
                className="block py-2 px-3 text-b rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-black dark:hover:text-black md:dark:hover:bg-transparent"
              >
                List of Cars
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
