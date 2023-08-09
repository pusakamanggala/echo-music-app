import React from "react";
import useFetchCategories from "../hooks/useFetchCategories";
import { getAccessTokenFromCookie } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../img/LoadingAnimation.gif";

const Categories = () => {
  const navigate = useNavigate();
  const accessToken = getAccessTokenFromCookie();
  const { data, isError, isLoading, isSuccess } = useFetchCategories({
    accessToken,
  });

  return (
    <div className="h-full">
      {isLoading && (
        <div className="h-full flex flex-col justify-center">
          <img className="mx-auto w-28" src={LoadingAnimation} alt="" />
        </div>
      )}
      {isError && (
        <div className="h-full flex flex-col justify-center">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </div>
      )}
      {isSuccess && (
        <>
          <h1 className="font-bold text-white text-xl my-3">Browse All</h1>
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 ">
            {data.categories.items.map((category) => (
              <div
                key={category.id}
                className="rounded-lg overflow-hidden relative cursor-pointer hover:scale-105"
                onClick={() => navigate(`/browse/category/${category.id}`)}
              >
                <img src={category.icons[0].url} alt="" />
                <h1 className="absolute bottom-2 right-3 text-lg font-bold text-white">
                  {category.name}
                </h1>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
