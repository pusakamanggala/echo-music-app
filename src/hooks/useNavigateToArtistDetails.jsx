import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import NowPlayingContext from "../context/NowPlayingProvider";
import useIsMobile from "./useIsMobile";

const useNavigateToArtistDetails = () => {
  const navigate = useNavigate();
  const { setPlayingView } = useContext(NowPlayingContext);
  const isMobile = useIsMobile();

  const navigateToArtistDetails = (artistId) => {
    navigate(`/artist/${artistId}`);
    if (isMobile) setPlayingView(false);
  };

  return navigateToArtistDetails;
};

export default useNavigateToArtistDetails;
