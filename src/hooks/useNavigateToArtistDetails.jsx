import { useNavigate } from "react-router-dom";

const useNavigateToArtistDetails = () => {
  const navigate = useNavigate();

  const navigateToArtistDetails = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return navigateToArtistDetails;
};

export default useNavigateToArtistDetails;
