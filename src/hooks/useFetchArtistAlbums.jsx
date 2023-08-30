import { useQuery } from "@tanstack/react-query";

const useFetchArtistAlbums = ({ accessToken, artistId, limit, offset = 0 }) => {
  const fetchArtistAlbums = () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/artists/${artistId}/albums?market=ID&offset=${offset}`;

    // if limit is undefined, it will fetch all the data
    if (limit !== undefined) {
      url += `&limit=${limit}`;
    }

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch artist albums");
      }

      return response.json();
    });
  };

  return useQuery(["artistAlbums", artistId, limit, offset], fetchArtistAlbums);
};

export default useFetchArtistAlbums;
