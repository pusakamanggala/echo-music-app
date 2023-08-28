import { useQuery } from "@tanstack/react-query";

const useFetchTrack = ({ accessToken, trackId, autoFetch = false }) => {
  const fetchTrack = async () => {
    let url = `${import.meta.env.VITE_API_URL}/tracks/${trackId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch track");
    }

    const data = await response.json();
    return data;
  };

  return useQuery(["featuredPlaylists", trackId, autoFetch], fetchTrack, {
    enabled: autoFetch, // Pass the autoFetch parameter here
  });
};

export default useFetchTrack;
