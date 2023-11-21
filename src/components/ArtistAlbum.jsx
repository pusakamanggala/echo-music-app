import useFetchArtistAlbums from "../hooks/useFetchArtistAlbums";
import { getAccessTokenFromCookie } from "../utils/helpers";
import useGetFecthLimit from "../hooks/useGetFecthLimit";
import useNavigateToAlbumDetails from "../hooks/useNavigateToAlbumDetails";
import PropTypes from "prop-types";

const ArtistsAlbum = ({ artistId }) => {
  const accessToken = getAccessTokenFromCookie();
  const { gridSize, fetchLimit } = useGetFecthLimit();
  const navigateAlbumDetails = useNavigateToAlbumDetails();

  const { data, isSuccess } = useFetchArtistAlbums({
    accessToken,
    limit: fetchLimit,
    offset: 0,
    artistId,
  });

  return (
    <>
      {isSuccess && (
        <section>
          <div className="flex justify-between items-center text-white mb-8">
            <h1 className="text-xl font-bold">Albums</h1>
          </div>
          <div className={`grid ${gridSize} gap-4`}>
            {data.items.map((album) => (
              <div
                key={album.id}
                onClick={() => navigateAlbumDetails(album.id)}
                className="bg-white/20 backdrop-filter rounded-lg p-4 shadow-md text-white hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer"
              >
                <img
                  src={album.images[0].url}
                  alt={album.name}
                  className="w-full mb-2 rounded-md"
                />
                <h1 className="text-lg font-semibold line-clamp-1">
                  {album.name}
                </h1>
                <p className="line-clamp-2 font-medium text-gray-300">
                  {album.artists[0].name}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ArtistsAlbum;

ArtistsAlbum.propTypes = {
  artistId: PropTypes.string.isRequired,
};
