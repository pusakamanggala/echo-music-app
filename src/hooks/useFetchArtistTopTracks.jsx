import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchArtistTopTracks = ({ accessToken, artistId }) => {
  const { handleSessionExpired } = useSession();

  const fetchArtistTopTracks = async () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/artists/${artistId}/top-tracks?market=ID`;

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
        throw new Error("Failed to fetch artist top tracks");
      }
    }

    return response.json();
  };

  return useQuery(["artistTopTracks", artistId], fetchArtistTopTracks, {
    retry: 1,
  });
};

export default useFetchArtistTopTracks;
