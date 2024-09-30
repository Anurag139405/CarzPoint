import React from "react";
import Heading from "./navbar/heading";
import Head from "./navbar/menu";

const Header: React.FC = () => {
  return (
    <>
      <Heading />
      <div className="navbar bg-white shadow-md  flex items-center justify-between px-12">
        <div className="">
          <a href="/home" className="btn btn-ghost text-3xl text-black">
            CarZ{" "}
          </a>
        </div>

        <div className="form-control">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="input w-full text-black bg-white rounded-none border-gray-600 border-solid border-2"
              style={{ width: "40rem", padding: "1rem" }}
            />

            <button className="btn bg-red-500 text-white border-none ml-2 w-40 rounded-none">
              Search
            </button>
          </div>
        </div>

        <div className="flex-[0.2] gap-2 w-10">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body rounded-md bg-white">
                <span className="text-lg font-bold text-black">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Head />
    </>
  );
};

export default Header;
