import { createContext, useState, useEffect } from "react";
import PropType from "prop-types";

const NowPlayingContext = createContext();

export const NowPlayingProvider = ({ children }) => {
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
    setPlayingView(true);
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
