import { createContext, useState, useEffect } from "react";
import PropType from "prop-types";
import useIsMobile from "../hooks/useIsMobile";

const NowPlayingContext = createContext();

export const NowPlayingProvider = ({ children }) => {
  const isMobile = useIsMobile();
  const [nowPlaying, setNowPlaying] = useState(() => {
    const storedNowPlaying = sessionStorage.getItem("nowPlaying");
    return storedNowPlaying || "";
  });

  useEffect(() => {
    sessionStorage.setItem("nowPlaying", nowPlaying);
  }, [nowPlaying]);

  const [playingView, setPlayingView] = useState(nowPlaying ? true : false);

  const handlePlayTrack = (trackId) => {
    setNowPlaying(trackId);
    if (!isMobile) setPlayingView(true);
  };

  return (
    <NowPlayingContext.Provider
      value={{
        nowPlaying,
        setNowPlaying,
        playingView,
        setPlayingView,
        handlePlayTrack,
      }}
    >
      {children}
    </NowPlayingContext.Provider>
  );
};

NowPlayingProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default NowPlayingContext;
