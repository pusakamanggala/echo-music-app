import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchArtistAlbums = ({ accessToken, artistId, limit, offset = 0 }) => {
  const { handleSessionExpired } = useSession();

  const fetchArtistAlbums = async () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/artists/${artistId}/albums?market=ID&offset=${offset}`;

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
        throw new Error("Failed to fetch artist albums");
      }
    }

    return response.json();
  };

  return useQuery(
    ["artistAlbums", artistId, limit, offset],
    fetchArtistAlbums,
    {
      retry: 1,
    }
  );
};

export default useFetchArtistAlbums;
