import { useState, useEffect, useContext } from "react";
import { getFetchLimitByScreen } from "../utils/helpers";
import NowPlayingContext from "../context/NowPlayingProvider";

function useGetFetchLimit() {
  const [fetchLimit, setFetchLimit] = useState();
  const { playingView } = useContext(NowPlayingContext);

  useEffect(() => {
    const updateFetchLimit = () => {
      setFetchLimit(getFetchLimitByScreen(playingView));
    };

    // Initial setup on component mount
    updateFetchLimit();

    // Event listener for screen size changes
    window.addEventListener("resize", updateFetchLimit);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateFetchLimit);
    };
  }, [playingView]);

  const gridSize = `grid-cols-${fetchLimit}`;

  return { gridSize, fetchLimit };
}

export default useGetFetchLimit;
