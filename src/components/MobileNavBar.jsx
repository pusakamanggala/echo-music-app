import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import NowPlayingContext from "../context/NowPlayingProvider";

const MobileNavBar = () => {
  const [showNote, setShowNote] = useState(false);
  const { setPlayingView } = useContext(NowPlayingContext);
  return (
    <nav className="grid grid-cols-3 items-center p-5 bg-slate-900">
      <NavLink
        to="/browse"
        title="Browse"
        className={({ isActive }) =>
          isActive
            ? "text-white flex flex-col justify-center items-center"
            : "text-gray-500 flex flex-col justify-center items-center"
        }
        onClick={() => setPlayingView(false)}
      >
        <FontAwesomeIcon className="h-6" icon={faMagnifyingGlass} />
        <p className="text-xs font-semibold">Search</p>
      </NavLink>
      <NavLink
        title="Home"
        to="/home"
        className={({ isActive }) =>
          isActive
            ? "text-white flex flex-col justify-center items-center"
            : "text-gray-500 flex flex-col justify-center items-center"
        }
        onClick={() => setPlayingView(false)}
      >
        <FontAwesomeIcon className="h-6" icon={faHouse} />
        <p className="text-xs font-semibold">Home</p>
      </NavLink>
      <div className=" flex justify-center">
        <button
          type="button"
          title="Note"
          className={` flex relative ${
            showNote ? "text-green-700" : "text-white animate-pulse"
          } `}
          onClick={() => setShowNote(!showNote)}
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="h-6" />
          {showNote && (
            <h1 className="text-xs m-2 absolute bottom-5 -right-5 bg-white/60 text-black backdrop-blur-md w-80 p-2 rounded-md font-semibold text-justify">
              While you can interact with the player&apos;s controls, it
              won&apos;t play actual songs due to technical constraints. For an
              immersive music streaming experience, it is recommended to use
              official Spotify music streaming platforms.
            </h1>
          )}
        </button>
      </div>
    </nav>
  );
};

export default MobileNavBar;
