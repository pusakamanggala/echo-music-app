import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="flex-col mr-2 text-white md:flex hidden">
      <div className="p-4 bg-white/10 rounded-lg mb-2">
        {/* Sidebar header */}
        <h1 className="font-bold text-xl">echo.</h1>
      </div>
      <div className="p-7 bg-white/10 rounded-lg">
        {/* Sidebar navigation */}
        <div className="grid gap-7 items-center">
          <NavLink
            title="Home"
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
          <NavLink
            to="/browse"
            title="Browse"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-500"
            }
          >
            <FontAwesomeIcon
              className="h-full hover:text-white transition-colors duration-500 ease-in-out cursor-pointer"
              icon={faMagnifyingGlass}
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
