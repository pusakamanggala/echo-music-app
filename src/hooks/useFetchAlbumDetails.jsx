import { useQuery } from "@tanstack/react-query";

const useFetchAlbumDetails = ({ accessToken, albumId }) => {
  const fetchAlbumDetails = () => {
    let url = `${import.meta.env.VITE_API_URL}/albums/${albumId}?market=ID`;

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch album details");
      }

      return response.json();
    });
  };

  return useQuery(["albumDetails", albumId], fetchAlbumDetails);
};

export default useFetchAlbumDetails;
