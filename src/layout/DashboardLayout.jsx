import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import SongPlayer from "../components/SongPlayer";
import PlayingView from "../components/PlayingView";
import NowPlayingContext from "../context/NowPlayingProvider";
import PropType from "prop-types";
import MobileNavBar from "../components/MobileNavBar";
import useIsMobile from "../hooks/useIsMobile";

const DashboardLayout = ({ children }) => {
  const { playingView } = useContext(NowPlayingContext);
  const isMobile = useIsMobile();
  return (
    <div className="h-dvh relative">
      <div className={`flex h-full bg-black pb-0 ${!isMobile && "p-4"}`}>
        {!isMobile && <Sidebar />}
        <main
          className={`flex-grow bg-gradient-to-t from-black to-sky-700 ${
            !isMobile && "rounded-lg"
          } p-4 overflow-y-scroll ${
            playingView
              ? "lg:w-3/4 md:w-2/3 lg:block md:block hidden"
              : " block"
          }`}
        >
          <div className={`${isMobile ? "mb-44" : "mb-20"}`}>{children}</div>
        </main>
        {playingView && (
          <section
            className={`lg:w-1/4 md:w-1/3 w-full bg-black p-4 text-white overflow-y-scroll ${
              isMobile ? "mb-44" : "mb-20"
            } overflow-x-hidden`}
          >
            <PlayingView />
          </section>
        )}
      </div>
      <section
        className={`${
          isMobile ? "bg-slate-900/70 backdrop-blur-sm" : "bg-black"
        }  absolute bottom-0 w-full rounded-lg`}
      >
        <SongPlayer />
        {isMobile && <MobileNavBar />}
      </section>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropType.node.isRequired,
};

export default DashboardLayout;
