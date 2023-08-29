import { useNavigate } from "react-router-dom";

const useNavigatePlaylistDetails = () => {
  const navigate = useNavigate();

  const goToPlaylistDetails = (id) => {
    navigate(`/playlist-items/${id}`);
  };

  return goToPlaylistDetails;
};

export default useNavigatePlaylistDetails;
