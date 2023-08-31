import { useNavigate } from "react-router-dom";

const useNavigateToAlbumDetails = () => {
  const navigate = useNavigate();

  const navigateToAlbumDetails = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  return navigateToAlbumDetails;
};

export default useNavigateToAlbumDetails;
