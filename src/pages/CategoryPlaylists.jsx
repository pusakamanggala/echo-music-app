import useFetchCategoryPlaylists from "../hooks/useFetchCategoryPlaylists";
import { getAccessTokenFromCookie } from "../utils/helpers";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../img/loadingAnimation.gif";
import useGetFetchLimit from "../hooks/useGetFecthLimit";
import useNavigatePlaylistDetails from "../hooks/useNavigatePlaylistDetails";

const CategoryPlaylists = () => {
  const accessToken = getAccessTokenFromCookie();
  const { categoryId } = useParams();
  const { gridSize } = useGetFetchLimit();
  const navigatePlaylistDetails = useNavigatePlaylistDetails();

  // to fetch category informations
  const { data, isLoading, isError, isSuccess } = useFetchCategoryPlaylists({
    accessToken,
    categoryId,
  });

  // to fetch category playlists
  const { data: playlistsData, isSuccess: isPLaylistsSuccess } =
    useFetchCategoryPlaylists({
      accessToken,
      categoryId,
      type: "playlists",
    });

  return (
    <div className="h-full">
      {isLoading && (
        <div className="h-full flex flex-col justify-center">
          <img
            className="mx-auto w-28"
            src={LoadingAnimation}
            alt="Loading Animation"
          />
        </div>
      )}
      {isError && (
        <div className="h-full flex flex-col justify-center">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </div>
      )}
      {isPLaylistsSuccess && isSuccess && (
        <>
          <div className="relative flex justify-between items-center">
            <h1 className="text-white text-5xl font-bold">{data.name}</h1>
            <img
              className="w-60 rounded-lg hidden md:block"
              src={data.icons[0].url}
              alt={data.name}
            />
          </div>
          <div>
            <h1 className="font-bold text-2xl my-10 text-white">
              {data.name} Playlists
            </h1>
            <div className={`grid ${gridSize} gap-4 `}>
              {playlistsData.playlists.items.map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => navigatePlaylistDetails(playlist.id)}
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
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPlaylists;
