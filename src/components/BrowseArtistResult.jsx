import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie } from "../utils/helpers";
import useGetFetchLimit from "../hooks/useGetFecthLimit";
import PropTypes from "prop-types";
import useNavigateToArtistDetails from "../hooks/useNavigateToArtistDetails";

const BrowseArtistResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const { gridSize, fetchLimit } = useGetFetchLimit();
  const navigateArtistDetails = useNavigateToArtistDetails();

  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: fetchLimit,
    searchQuery: searchQuery,
    offset: 0,
    autoFetch: true,
    searchType: "artist",
  });

  const LoadingSkeleton = (gridSize, length) => {
    const skeletonItems = Array.from({ length: length });

    return (
      <div className="w-full">
        <h1 className="font-bold text-white text-xl my-6">Artists</h1>
        <div className={`grid ${gridSize} gap-4`}>
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md animate-pulse"
            >
              <div className="mb-2 h-36 bg-gray-500 rounded-full mx-auto aspect-square"></div>
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
          <h1 className="font-bold text-white text-xl my-6">Artists</h1>
          <div className={`grid ${gridSize} gap-4 `}>
            {data.artists.items.map((artist) => (
              <div
                key={artist.id}
                onClick={() => navigateArtistDetails(artist.id)}
                className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer"
              >
                <img
                  src={
                    artist.images.length > 0
                      ? artist.images[0].url
                      : "https://i1.sndcdn.com/avatars-000266928381-je9qnt-t500x500.jpg"
                  }
                  alt={artist.name}
                  className="mb-2 rounded-full object-cover lg:max-h-44 md:max-h-36 mx-auto aspect-square"
                />
                <h3 className="text-lg font-semibold line-clamp-1">
                  {artist.name}
                </h3>
                <p className="text-gray-300 line-clamp-1 capitalize">
                  {artist.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

BrowseArtistResult.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default BrowseArtistResult;
