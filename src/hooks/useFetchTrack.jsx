import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchTrack = ({ accessToken, trackId, autoFetch = false }) => {
  const { handleSessionExpired } = useSession();

  const fetchTrack = async () => {
    let url = `${import.meta.env.VITE_API_URL}/tracks/${trackId}`;

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
        throw new Error("Failed to fetch track");
      }
    }

    const data = await response.json();
    return data;
  };

  return useQuery(["featuredPlaylists", trackId, autoFetch], fetchTrack, {
    enabled: autoFetch,
    retry: 1, // Set the retry option to 1
  });
};

export default useFetchTrack;
