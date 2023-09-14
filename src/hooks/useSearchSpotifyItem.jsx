import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useSearchSpotifyItem = ({
  accessToken,
  searchQuery,
  searchType,
  limit = 6,
  offset = 0,
  autoFetch,
}) => {
  const { handleSessionExpired } = useSession();

  const fetchSpotifyItems = async () => {
    let url = `${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(
      searchQuery
    )}&type=${searchType}&limit=${limit}&offset=${offset}`;

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
        throw new Error(`Failed to fetch ${searchType}`);
      }
    }

    const data = await response.json();
    return data;
  };

  return useQuery([searchType, searchQuery, limit, offset], fetchSpotifyItems, {
    enabled: autoFetch,
    retry: 1, // Set the retry option to 1
  });
};

export default useSearchSpotifyItem;
