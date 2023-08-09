import { useQuery } from "@tanstack/react-query";

const useFetchCategoryPlaylists = ({ accessToken, categoryId, type }) => {
  const fetchCategoryDetail = () => {
    let url = `${import.meta.env.VITE_API_URL}/browse/categories/${categoryId}`;

    if (type !== undefined) {
      url += `/${type}`;
    }

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch category detail");
      }

      return response.json();
    });
  };

  return useQuery(["categoryDetail", categoryId, type], fetchCategoryDetail);
};

export default useFetchCategoryPlaylists;
