import { useQuery } from "@tanstack/react-query";

const useSearchSpotifyItem = ({
  accessToken,
  searchQuery,
  searchType,
  limit = 6,
  offset = 0,
  autoFetch,
}) => {
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
      throw new Error(`Failed to fetch ${searchType}`);
    }

    const data = await response.json();
    return data;
  };

  return useQuery([searchType, searchQuery, limit, offset], fetchSpotifyItems, {
    enabled: autoFetch, // Pass the autoFetch option to the enabled property
  });
};

export default useSearchSpotifyItem;
