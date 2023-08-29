import { useQuery } from "@tanstack/react-query";

const useFetchPlaylistDetails = ({ accessToken, playlistId }) => {
  const fetchPlaylistDetails = () => {
    let url = `${import.meta.env.VITE_API_URL}/playlists/${playlistId}`;

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch playlist items");
      }

      return response.json();
    });
  };

  return useQuery(["playlistDetails", playlistId], fetchPlaylistDetails);
};

export default useFetchPlaylistDetails;
