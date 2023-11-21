import { useContext } from "react";
import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie, msToMinuteSecond } from "../utils/helpers";
import NowPlayingContext from "../context/NowPlayingProvider";
import PropTypes from "prop-types";

const BrowseTrackResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const { handlePlayTrack, nowPlaying } = useContext(NowPlayingContext);
  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: 4,
    searchQuery: searchQuery,
    searchType: "track",
  });

  const LoadingSkeleton = () => {
    const skeletonItems = Array.from({ length: 4 }); // Adjust the number of skeleton items as needed

    return (
      <div>
        <h1 className="font-bold text-white text-xl my-3">Songs</h1>
        <div className="grid grid-rows-4">
          {skeletonItems.map((_, index) => (
            <div key={index} className="flex p-2 rounded-md animate-pulse">
              <div className="h-12 w-12 bg-gray-500 mr-3 rounded-md"></div>
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col w-4/5">
                  <div className="h-4 bg-gray-400 mb-2 w-48"></div>
                  <div className="h-3 bg-gray-400 w-24"></div>
                </div>
                <div className="w-9">
                  <div className="h-4 bg-gray-400 mb-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading && LoadingSkeleton()}
      {isError && (
        <h1 className="font-semibold text-center text-white">
          Something went wrong, please try again
        </h1>
      )}
      {isSuccess && (
        <div>
          <h1 className="font-bold text-white text-xl my-3">Songs</h1>
          <div className="grid grid-rows-4">
            {data.tracks.items.map((track) => (
              <div
                key={track.id}
                className="flex hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer p-2 rounded-md"
                onClick={() => handlePlayTrack(track.id)}
              >
                <img
                  className="h-12 mr-3"
                  src={track.album.images[1].url}
                  alt={track.name}
                />
                <div className="flex justify-between w-full items-center text-white">
                  <div className="flex flex-col">
                    <h1
                      className={`${
                        nowPlaying === track.id
                          ? "text-green-500"
                          : "text-white"
                      } font-semibold text-lg line-clamp-1`}
                    >
                      {track.name}
                    </h1>
                    <h1 className="text-gray-300">
                      {track.explicit && (
                        <span className="bg-gray-300 px-1 mr-1 text-xs text-black rounded-sm">
                          E
                        </span>
                      )}
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </h1>
                  </div>
                  <div>
                    <h1>{msToMinuteSecond(track.duration_ms)}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

BrowseTrackResult.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default BrowseTrackResult;
