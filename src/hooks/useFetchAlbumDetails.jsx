import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchAlbumDetails = ({ accessToken, albumId }) => {
  const { handleSessionExpired } = useSession();

  const fetchAlbumDetails = async () => {
    let url = `${import.meta.env.VITE_API_URL}/albums/${albumId}?market=ID`;

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
        throw new Error("Failed to fetch album details");
      }
    }

    return response.json();
  };

  return useQuery(["albumDetails", albumId], fetchAlbumDetails, { retry: 1 });
};

export default useFetchAlbumDetails;
