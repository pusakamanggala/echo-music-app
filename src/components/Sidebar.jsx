import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLocation, NavLink } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex-col mr-2 text-white md:flex hidden">
      <div className="p-4 bg-white/10 rounded-lg mb-2">
        {/* Sidebar header */}
        <h2 className="text-xl  font-bold">LOGO</h2>
      </div>
      <nav className="p-7 bg-white/10 rounded-lg">
        {/* Sidebar navigation */}
        <div className="grid gap-7 items-center">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-500"
            }
          >
            <FontAwesomeIcon
              className="h-full  hover:text-white transition-colors duration-500 ease-in-out cursor-pointer"
              icon={faHouse}
            />
          </NavLink>
          <div>
            <FontAwesomeIcon
              className="h-full text-gray-500 hover:text-white transition-colors duration-500 ease-in-out cursor-pointer"
              icon={faMagnifyingGlass}
            />
          </div>
        </div>
      </nav>
      <div className="h-full flex flex-col justify-end items-center">
        <h1>Echo.</h1>
        <h1>2023</h1>
      </div>
    </div>
  );
};

export default Sidebar;
