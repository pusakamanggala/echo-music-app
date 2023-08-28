import { useQuery } from "@tanstack/react-query";

const useFetchArtist = ({ accessToken, artistId, autoFetch = false }) => {
  const fetchArtist = async () => {
    let url = `${import.meta.env.VITE_API_URL}/artists/${artistId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch artist");
    }

    const data = await response.json();
    return data;
  };

  return useQuery(["artist", artistId, autoFetch], fetchArtist, {
    enabled: autoFetch,
  });
};

export default useFetchArtist;
