import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchPlaylistDetails = ({ accessToken, playlistId }) => {
  const { handleSessionExpired } = useSession();

  const fetchPlaylistDetails = async () => {
    let url = `${import.meta.env.VITE_API_URL}/playlists/${playlistId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleSessionExpired();
        throw new Error("Invalid access token");
      } else {
        throw new Error("Failed to fetch playlist items");
      }
    }

    return response.json();
  };

  return useQuery(["playlistDetails", playlistId], fetchPlaylistDetails, {
    retry: 1,
  });
};

export default useFetchPlaylistDetails;
