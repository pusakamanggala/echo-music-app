import { useQuery } from "@tanstack/react-query";
import { useSession } from "../context/SessionProvider";

const useFetchCategories = ({ accessToken }) => {
  const { handleSessionExpired } = useSession();

  const fetchCategories = async () => {
    let url = `${
      import.meta.env.VITE_API_URL
    }/browse/categories?country=ID&offset=0&limit=20`;

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
        throw new Error("Failed to fetch categories");
      }
    }

    return response.json();
  };

  return useQuery(["categories"], fetchCategories, {
    retry: 1,
  });
};

export default useFetchCategories;
