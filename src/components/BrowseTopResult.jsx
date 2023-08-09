import React from "react";
import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie } from "../utils/helpers";
import LoadingAnimation from "../img/LoadingAnimation.gif";

const BrowseTopResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: 1,
    searchQuery: searchQuery,
    searchType: "playlist",
  });

  return (
    <>
      {isLoading && (
        <img className="mx-auto w-28" src={LoadingAnimation} alt="" />
      )}
      {isError && (
        <h1 className="font-semibold text-center text-white">
          Something went wrong, please try again
        </h1>
      )}
      {isSuccess && (
        <div className="w-full">
          <h1 className="font-bold text-white text-xl my-3">Top Result</h1>
          <div className="bg-white/20 backdrop-filter rounded-lg p-4  text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer">
            <img
              className="h-44 rounded-md"
              src={data.playlists.items[0].images[0].url}
              alt=""
            />
            <h1 className="my-2 font-bold text-xl line-clamp-1">
              {data.playlists.items[0].name}
            </h1>
            <h1>By {data.playlists.items[0].owner.display_name}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default BrowseTopResult;
