import { useQuery } from "@tanstack/react-query";

const useFetchNewReleaseAlbum = ({ accessToken, limit, offset = 0 }) => {
  const fetchNewReleaseAlbum = () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/browse/new-releases?offset=${offset}`;

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
        throw new Error("Failed to fetch new release albums");
      }

      return response.json();
    });
  };

  return useQuery(["newReleaseAlbums", limit, offset], fetchNewReleaseAlbum);
};

export default useFetchNewReleaseAlbum;
