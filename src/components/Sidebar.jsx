import React, { useEffect, useState } from "react";

const Sidebar = ({ isOpen, closeDrawer, onTypeSelect }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
      const result = data.results;
      // console.log(result);
      const names = result.map((type) => type.name);
      // console.log(names);
      setTypes(names);
    };
    getCategories();
  }, []);

  return (
    <div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30"
          onClick={closeDrawer}
        ></div>
      )}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform rounded-r-3xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white `}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={closeDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <h2 className="pb-2 pt-14">
          <span>Filter</span> pokemons by{" "}
          <span className="font-semibold text-black">type</span>
        </h2>
        <div className="grid grid-cols-2 gap-6 pt-5 pr-6 pr-3">
          <span
            className="bg-red-100 py-2 px-4 text-gray-500 rounded-full text-center hover:bg-red-400 hover:text-white"
            onClick={() => onTypeSelect(null)}
          >
            All
          </span>
          {types.map((type) => (
            <span
              className="bg-red-100 py-2 px-4 text-gray-500 rounded-full text-center hover:bg-red-400 hover:text-white"
              key={type}
              onClick={() => onTypeSelect(type)}
            >
              {type}
            </span>
          ))}
        </div>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Add your list items here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
