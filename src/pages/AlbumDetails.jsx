import { useContext } from "react";
import useFetchAlbumDetails from "../hooks/useFetchAlbumDetails";
import { getAccessTokenFromCookie, msToMinuteSecond } from "../utils/helpers";
import { useParams } from "react-router-dom";
import useNavigateToArtistDetails from "../hooks/useNavigateToArtistDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import NowPlayingContext from "../context/NowPlayingProvider";
import LoadingAnimation from "../img/loadingAnimation.gif";

const AlbumDetails = () => {
  const accessToken = getAccessTokenFromCookie();
  const navigateToArtistDetails = useNavigateToArtistDetails();
  const { albumId } = useParams();
  const { handlePlayTrack } = useContext(NowPlayingContext);

  const { data, isLoading, isError, isSuccess } = useFetchAlbumDetails({
    accessToken,
    albumId,
  });

  return (
    <section className="h-full">
      {isLoading && (
        <div className="h-full flex justify-center items-center ">
          <img className="h-20" src={LoadingAnimation} alt="" />
        </div>
      )}
      {isError && (
        <div className="h-full flex justify-center items-center ">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </div>
      )}
      {isSuccess && (
        <>
          <section className="flex text-white items-end">
            <img
              className="h-52 rounded-md hidden md:block mr-4"
              src={data.images[0].url}
              alt=""
            />
            <div>
              <p className="capitalize font-semibold">{data.album_type}</p>
              <h1 className="text-8xl font-bold my-5">{data.name}</h1>
              <div className="flex space-x-1 font-semibold">
                <h1 className="line-clamp-1">
                  {data.artists.map((artist, index) => (
                    <span key={artist.id}>
                      <span
                        className="cursor-pointer hover:underline  text-sm"
                        onClick={() => navigateToArtistDetails(artist.id)}
                      >
                        {artist.name}
                      </span>
                      {index !== data.artists.length - 1 && " • "}
                    </span>
                  ))}
                </h1>
                <p>•</p>
                <p>{data.release_date.slice(0, 4)}</p>
                <p>•</p>
                <p>{data.total_tracks} songs</p>
              </div>
            </div>
          </section>
          <section className="mt-5 text-white">
            <table className="table-auto w-full text-gray-400 text-left">
              <thead className="h-14 border-b border-gray-500">
                <tr>
                  <th className="font-medium p-2 text-center">#</th>
                  <th className="font-medium">Title</th>

                  <th className="font-medium text-center">
                    <FontAwesomeIcon icon={faClock} />
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-md">
                {data.tracks.items.map((track, index) => (
                  <tr
                    key={track.id}
                    onClick={() => handlePlayTrack(track.id)}
                    className="hover:bg-white/40 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer text-gray-400"
                  >
                    <td className="px-0 rounded-l-md p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="flex items-center p-2">
                      <div>
                        <h1 className="text-white line-clamp-1">
                          {track.name}
                        </h1>
                        <h1 className="text-gray-400 line-clamp-1">
                          {track.explicit && (
                            <span className="bg-gray-400 px-1 mr-1 text-xs text-black rounded-sm">
                              E
                            </span>
                          )}
                          {data.artists.map((artist) => artist.name).join(", ")}
                        </h1>
                      </div>
                    </td>
                    <td className="rounded-r-md text-center">
                      {msToMinuteSecond(track.duration_ms)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </section>
  );
};

export default AlbumDetails;
