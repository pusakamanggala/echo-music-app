import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie } from "../utils/helpers";
import PropTypes from "prop-types";
import useNavigatePlaylistDetails from "../hooks/useNavigatePlaylistDetails";

const BrowseTopResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const navigatePlaylistDetails = useNavigatePlaylistDetails();

  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: 1,
    searchQuery: searchQuery,
    searchType: "playlist",
  });

  const LoadingSkeleton = () => {
    return (
      <div className="w-full">
        <h1 className="font-bold text-white text-xl my-3">Top Result</h1>
        <div className="bg-white/20 backdrop-filter rounded-lg p-4 animate-pulse">
          <div className="h-44 aspect-square rounded-md bg-gray-500"></div>
          <div className="my-2 bg-gray-400 h-6 w-48"></div>
          <div className="bg-gray-400 h-4 w-20"></div>
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
        <div className="w-full">
          <h1 className="font-bold text-white text-xl my-3">Top Result</h1>
          <div
            className="bg-white/20 backdrop-filter rounded-lg p-4  text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer"
            onClick={() => navigatePlaylistDetails(data.playlists.items[0].id)}
          >
            <img
              className="h-44 rounded-md"
              src={data.playlists.items[0].images[0].url}
              alt={data.playlists.items[0].name}
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

BrowseTopResult.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default BrowseTopResult;
