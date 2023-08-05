import React, { useEffect, useState } from "react";
import useFetchFeaturedPlaylists from "../hooks/useFecthFeaturedPLaylists";
import useFetchNewReleaseAlbum from "../hooks/useFetchNewReleaseAlbum";
import {
  getAccessTokenFromCookie,
  getFetchLimitByScreen,
} from "../utils/helpers";
import LoadingAnimation from "../img/LoadingAnimation.gif";

const HomePage = () => {
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

  const {
    data: newAlbumData,
    isLoading: isNewAlbumLoading,
    isError: isNewAlbumError,
    isSuccess: isNewAlbumSuccess,
  } = useFetchNewReleaseAlbum({
    accessToken,
    limit: fetchLimit,
  });

  const {
    data: featuredPlaylistsData,
    isLoading: isFeaturedPlaylistsLoading,
    isError: isFeaturedPlaylistsError,
    isSuccess: isFeaturedPlaylistsSuccess,
  } = useFetchFeaturedPlaylists({ accessToken, limit: fetchLimit });

  return (
    <div>
      {/* Banner */}
      <div className="bg-black h-96 rounded-lg text-white overflow-hidden relative w-full">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/1021/802/327/musicians-freddie-mercury-freddy-mercury-brian-may-roger-taylor-john-deacon-men-queen-music-band-black-background-album-covers-bohemian-rhapsody-wallpaper-preview.jpg"
          alt="banner"
          className="h-full w-full object-contain"
        />
      </div>
      {/* featured PLaylist */}
      <div className="flex justify-between items-center text-white">
        <h1 className="my-8 text-xl font-bold">Today Featured Playlist</h1>
        <h1 className="font-semibold">Show all</h1>
      </div>
      {isFeaturedPlaylistsLoading && (
        <img className="mx-auto w-28" src={LoadingAnimation} alt="" />
      )}
      {isFeaturedPlaylistsError && (
        <h1 className="font-semibold text-center text-white">
          Something went wrong, please try again
        </h1>
      )}
      {isFeaturedPlaylistsSuccess && (
        <>
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {featuredPlaylistsData.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer"
              >
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-full mb-2 rounded-md"
                />
                <h3 className="text-lg font-semibold line-clamp-1">
                  {playlist.name}
                </h3>
                <p className="line-clamp-2 font-medium text-gray-300">
                  {playlist.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      {/* New Releases */}
      <div className="flex justify-between items-center text-white">
        <h1 className="my-8 text-xl font-bold">New Releases</h1>
        <h1 className="font-semibold">Show all</h1>
      </div>
      {isNewAlbumLoading && (
        <img className="mx-auto w-28" src={LoadingAnimation} alt="" />
      )}
      {isNewAlbumError && (
        <h1 className="font-semibold text-center text-white">
          Something went wrong, please try again
        </h1>
      )}
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 ">
        {isNewAlbumSuccess &&
          newAlbumData.albums.items.map((album) => (
            <div
              key={album.id}
              className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer"
            >
              <img
                src={album.images[1].url}
                alt={album.name}
                className="w-full mb-2 rounded-md"
              />
              <h3 className="text-lg font-semibold line-clamp-1">
                {album.name}
              </h3>
              <p className="line-clamp-2 font-medium text-gray-300">
                {album.artists[0].name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
