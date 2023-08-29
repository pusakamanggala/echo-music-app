import { useQuery } from "@tanstack/react-query";

const useFetchArtistTopTracks = ({ accessToken, artistId }) => {
  const fetchArtistTopTracks = () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/artists/${artistId}/top-tracks?market=ID`;

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch artist top tracks");
      }

      return response.json();
    });
  };

  return useQuery(["artistTopTracks", artistId], fetchArtistTopTracks);
};

export default useFetchArtistTopTracks;
