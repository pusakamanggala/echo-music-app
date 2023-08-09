import { useQuery } from "@tanstack/react-query";

const useFetchCategories = ({ accessToken }) => {
  const fetchCategories = () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/browse/categories?country=ID&offset=0&limit=20`;

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      return response.json();
    });
  };

  return useQuery(["categories"], fetchCategories);
};

export default useFetchCategories;
