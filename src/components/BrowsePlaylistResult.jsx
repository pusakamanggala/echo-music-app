import React, { useState, useEffect } from "react";
import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import {
  getAccessTokenFromCookie,
  getFetchLimitByScreen,
} from "../utils/helpers";
import LoadingAnimation from "../img/LoadingAnimation.gif";

const BrowsePlaylistResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const [fetchLimit, setFetchLimit] = useState();

  useEffect(() => {
    const updateFetchLimit = () => {
      setFetchLimit(getFetchLimitByScreen());
    };

    // Initial setup on component mount
    updateFetchLimit();

    // Event listener for screen size changes
    window.addEventListener("resize", updateFetchLimit);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateFetchLimit);
    };
  }, []);

  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: fetchLimit,
    searchQuery: searchQuery,
    offset: 1,
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
          <h1 className="font-bold text-white text-xl my-6">Playlists</h1>
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 ">
            {data.playlists.items.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer"
              >
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-full mb-2 rounded-md object-cover lg:max-h-44 md:max-h-36"
                />
                <h3 className="text-lg font-semibold line-clamp-1">
                  {playlist.name}
                </h3>
                <p className="text-gray-300 line-clamp-1">
                  By {playlist.owner.display_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BrowsePlaylistResult;