import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import NowPlayingContext from "../context/NowPlayingProvider";
import useIsMobile from "./useIsMobile";

const useNavigateToAlbumDetails = () => {
  const navigate = useNavigate();
  const { setPlayingView } = useContext(NowPlayingContext);
  const isMobile = useIsMobile();

  const navigateToAlbumDetails = (albumId) => {
    navigate(`/album/${albumId}`);
    if (isMobile) setPlayingView(false);
  };

  return navigateToAlbumDetails;
};

export default useNavigateToAlbumDetails;
