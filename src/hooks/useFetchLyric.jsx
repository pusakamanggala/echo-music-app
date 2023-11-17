import { useQuery } from "@tanstack/react-query";

const useFetchLyric = ({ trackId }) => {
  const fetchLyric = async () => {
    let url = `${import.meta.env.VITE_LYRICS_URL}/?trackid=${trackId}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Lyric not found");
      } else throw new Error("Failed to fetch lyric");
    }

    return response.json();
  };

  return useQuery(["lyric", trackId], fetchLyric, { retry: 1 });
};

export default useFetchLyric;
