import { useContext } from "react";
import useFetchPlaylistDetails from "../hooks/useFetchPlaylistDetails";
import { getAccessTokenFromCookie, msToMinuteSecond } from "../utils/helpers";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "../img/loadingAnimation.gif";
import NowPlayingContext from "../context/NowPlayingProvider";

const PlaylistDetails = () => {
  const accessToken = getAccessTokenFromCookie();
  const { playlistId } = useParams();
  const { handlePlayTrack } = useContext(NowPlayingContext);
  const { data, isSuccess, isLoading, isError } = useFetchPlaylistDetails({
    accessToken,
    playlistId,
  });

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <img className="w-20" src={LoadingAnimation} alt="" />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center h-full">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </div>
      )}
      {isSuccess && (
        <>
          <section className="flex mt-10">
            <div className="mr-2">
              <img
                className="w-60 object-contain"
                src={data.images[0].url}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-end text-white font-semibold ">
              <h3 className="capitalize">{data.type}</h3>
              <h1 className="text-5xl font-bold my-4">{data.name}</h1>
              <p className="text-gray-300">{data.description}</p>
              <div className="flex space-x-1 mt-2">
                <p>{data.owner.display_name}</p>
                <p>•</p>
                <p>{data.followers.total.toLocaleString()} likes</p>
                <p>•</p>
                <p>{data.tracks.total} songs</p>
              </div>
            </div>
          </section>
          <section className="mt-5 text-white">
            <table className="table-auto w-full text-gray-400 text-left ">
              <thead className="h-14 border-b border-gray-500">
                <tr>
                  <th className="font-medium p-2 text-center">#</th>
                  <th className="font-medium">Title</th>
                  <th className="font-medium">Album</th>
                  <th className="font-medium text-center">
                    <FontAwesomeIcon icon={faClock} />
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-md">
                {data.tracks.items.map(
                  (track, index) =>
                    track.track && (
                      <tr
                        key={track.track.id}
                        onClick={() => handlePlayTrack(track.track.id)}
                        className="hover:bg-white/40 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer text-gray-400"
                      >
                        <td className="px-0 rounded-l-md p-2 text-center">
                          {index + 1}
                        </td>
                        <td className="flex items-center p-2">
                          <img
                            className="h-12 mr-2"
                            src={track.track.album.images[2].url}
                          />
                          <div>
                            <h1 className="text-white line-clamp-1">
                              {track.track.name}
                            </h1>
                            <h1 className="line-clamp-1">
                              {track.track.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                            </h1>
                          </div>
                        </td>
                        <td>{track.track.album.name}</td>
                        <td className="rounded-r-md text-center">
                          {msToMinuteSecond(track.track.duration_ms)}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
};

export default PlaylistDetails;
