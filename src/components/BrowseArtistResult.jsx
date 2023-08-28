import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie } from "../utils/helpers";
import LoadingAnimation from "../img/LoadingAnimation.gif";
import useGetFetchLimit from "../hooks/useGetFecthLimit";
import PropTypes from "prop-types";

const BrowseArtistResult = ({ searchQuery }) => {
  const accessToken = getAccessTokenFromCookie();
  const { gridSize, fetchLimit } = useGetFetchLimit();

  const { data, isLoading, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: fetchLimit,
    searchQuery: searchQuery,
    offset: 0,
    autoFetch: true,
    searchType: "artist",
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
          <h1 className="font-bold text-white text-xl my-6">Artists</h1>
          <div className={`grid ${gridSize} gap-4 `}>
            {data.artists.items.map((artist) => (
              <div
                key={artist.id}
                className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer"
              >
                <img
                  src={
                    artist.images.length > 0
                      ? artist.images[0].url
                      : "https://i1.sndcdn.com/avatars-000266928381-je9qnt-t500x500.jpg"
                  }
                  alt={artist.name}
                  className=" mb-2 rounded-full object-cover lg:max-h-44 md:max-h-36 mx-auto"
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
