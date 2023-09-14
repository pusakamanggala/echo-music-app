import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchFeaturedPlaylists = ({ accessToken, limit, offset = 0 }) => {
  const { handleSessionExpired } = useSession();

  const fetchFeaturedPlaylists = async () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/browse/featured-playlists?offset=${offset}`;

    // if limit is undefined, it will fetch all the data
    if (limit !== undefined) {
      url += `&limit=${limit}`;
    }

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
        throw new Error("Failed to fetch featured playlists");
      }
    }

    const data = await response.json();
    return data.playlists.items;
  };

  return useQuery(
    ["featuredPlaylists", limit, offset],
    fetchFeaturedPlaylists,
    { retry: 1 }
  );
};

export default useFetchFeaturedPlaylists;
