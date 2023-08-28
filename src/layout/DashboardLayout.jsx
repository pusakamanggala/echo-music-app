import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import SongPlayer from "../components/SongPlayer";
import PlayingView from "../components/PlayingView";
import NowPlayingContext from "../context/NowPlayingProvider";
import PropType from "prop-types";

const DashboardLayout = ({ children }) => {
  const { playingView } = useContext(NowPlayingContext);
  return (
    <div className="h-screen relative">
      <div className="flex h-full bg-black p-4 pb-0">
        {/* Sidebar component */}
        <Sidebar />
        <main
          className={`flex-grow bg-gradient-to-t from-black to-sky-700 rounded-lg p-4 overflow-y-scroll mb-20  ${
            playingView
              ? "lg:w-3/4 md:w-2/3 lg:block md:block hidden"
              : " block"
          }`}
        >
          {/* Content */}
          {/* Main content */}
          {children}
        </main>
        {playingView && (
          <section className="lg:w-1/4 md:w-1/3 w-full bg-black p-4 text-white overflow-y-scroll mb-20 overflow-x-hidden">
            <PlayingView />
          </section>
        )}
      </div>

      <section className="bg-black p-2 absolute bottom-0 w-full">
        <div className=" h-full">
          {/* song player */}
          <SongPlayer />
        </div>
      </section>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropType.node.isRequired,
};

export default DashboardLayout;
