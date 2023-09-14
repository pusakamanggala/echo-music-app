import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchCategoryPlaylists = ({ accessToken, categoryId, type }) => {
  const { handleSessionExpired } = useSession();

  const fetchCategoryDetail = async () => {
    let url = `${import.meta.env.VITE_API_URL}/browse/categories/${categoryId}`;

    if (type !== undefined) {
      url += `/${type}`;
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
        throw new Error("Failed to fetch category detail");
      }
    }

    return response.json();
  };

  return useQuery(["categoryDetail", categoryId, type], fetchCategoryDetail, {
    retry: 1,
  });
};

export default useFetchCategoryPlaylists;
