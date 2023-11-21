import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie } from "../utils/helpers";
import useGetFetchLimit from "../hooks/useGetFecthLimit";
import PropTypes from "prop-types";
import useNavigatePlaylistDetails from "../hooks/useNavigatePlaylistDetails";

const BrowsePlaylistResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const { gridSize, fetchLimit } = useGetFetchLimit();
  const navigatePlaylistDetails = useNavigatePlaylistDetails();

  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: fetchLimit,
    searchQuery: searchQuery,
    offset: 1,
    searchType: "playlist",
  });

  const LoadingSkeleton = (gridSize, length) => {
    const skeletonItems = Array.from({ length: length });

    return (
      <div className="w-full">
        <h1 className="font-bold text-white text-xl my-6">Playlists</h1>
        <div className={`grid ${gridSize} gap-4`}>
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md text-white animate-pulse"
            >
              <div className="w-full mb-2 h-36 bg-gray-500 rounded-md"></div>
              <div className="h-6 bg-gray-400 mb-2 w-4/5"></div>
              <p className="h-4 bg-gray-400 w-20"></p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading && LoadingSkeleton(gridSize, fetchLimit)}
      {isError && (
        <h1 className="font-semibold text-center text-white">
          Something went wrong, please try again
        </h1>
      )}
      {isSuccess && (
        <div className="w-full">
          <h1 className="font-bold text-white text-xl my-6">Playlists</h1>
          <div className={` grid ${gridSize} gap-4 `}>
            {data.playlists.items.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => {
                  navigatePlaylistDetails(playlist.id);
                }}
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

BrowsePlaylistResult.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default BrowsePlaylistResult;
