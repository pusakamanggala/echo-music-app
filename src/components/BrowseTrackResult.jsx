import { useContext } from "react";
import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie, msToMinuteSecond } from "../utils/helpers";
import LoadingAnimation from "../img/loadingAnimation.gif";
import NowPlayingContext from "../context/NowPlayingProvider";
import PropTypes from "prop-types";

const BrowseTrackResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const { handlePlayTrack } = useContext(NowPlayingContext);
  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: 4,
    searchQuery: searchQuery,
    searchType: "track",
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
                    <h1 className="font-semibold text-lg  line-clamp-1">
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
