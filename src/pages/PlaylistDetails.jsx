import { useContext } from "react";
import useFetchPlaylistDetails from "../hooks/useFetchPlaylistDetails";
import {
  getAccessTokenFromCookie,
  msToMinuteSecond,
  msToSentence,
} from "../utils/helpers";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "../img/loadingAnimation.gif";
import NowPlayingContext from "../context/NowPlayingProvider";
import MusicPlayingIcon from "../img/musicPlayingIcon.gif";
import MusicIcon from "../img/music-icon.jpg";
import useIsMobile from "../hooks/useIsMobile";

const PlaylistDetails = () => {
  const accessToken = getAccessTokenFromCookie();
  const { playlistId } = useParams();
  const { handlePlayTrack, nowPlaying } = useContext(NowPlayingContext);
  const { data, isSuccess, isLoading, isError } = useFetchPlaylistDetails({
    accessToken,
    playlistId,
  });

  const isMobile = useIsMobile();

  const sumTrackDuration = (data) => {
    let totalDuration = 0;
    data.tracks.items.forEach((track) => {
      if (track.track) {
        totalDuration += track.track.duration_ms;
      }
    });
    return msToSentence(totalDuration);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <img
            className="w-20"
            src={LoadingAnimation}
            alt="Loading Animation"
          />
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
          <section className="flex mt-10 items-end">
            <img
              className="mr-4 md:h-52 md:w-52 w-32 h-32 object-cover"
              src={data.images[0].url}
              alt="Loading Animation"
            />
            <div className="flex flex-col justify-end text-white font-semibold">
              <h3 className="capitalize">{data.type}</h3>
              <h1
                className={`${
                  data.name.length < 20
                    ? "md:text-8xl text-3xl"
                    : "md:text-5xl text-2xl"
                } font-bold line-clamp-3 py-3 md:py-5`}
              >
                {data.name}
              </h1>
              <div className="space-x-reverse space-x-1">
                <p
                  className="text-gray-300 line-clamp-3 mb-1"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
                <p className="inline-block">{data.owner.display_name}</p>
                <p className="inline-block">•</p>
                <p className="inline-block">
                  {data.followers.total.toLocaleString()} likes
                </p>
                <p className="inline-block">•</p>
                <p className="inline-block">{data.tracks.total} songs,</p>
                <p className="text-gray-300 inline-block">
                  {sumTrackDuration(data)}
                </p>
              </div>
            </div>
          </section>
          <section className="mt-5 text-white">
            <table className="table-auto w-full text-gray-400 text-left ">
              <thead className="h-14 border-b border-gray-500">
                <tr>
                  <th className="font-medium p-2 text-center">#</th>
                  <th className="font-medium">Title</th>
                  {!isMobile && <th className="font-medium">Album</th>}
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
                          {nowPlaying === track.track.id ? (
                            <img
                              src={MusicPlayingIcon}
                              alt="Music Playing Icon"
                              className="h-10 w-6 mx-auto"
                            />
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="flex items-center p-2">
                          <img
                            className="h-12 mr-2"
                            src={track.track.album.images[2]?.url || MusicIcon}
                            alt={track.track.name || "Music Icon"}
                          />
                          <div>
                            <h1
                              className={`${
                                nowPlaying === track.track.id
                                  ? "text-green-500"
                                  : "text-white"
                              } line-clamp-1 font-semibold`}
                            >
                              {track.track.name}
                            </h1>
                            <h1 className="line-clamp-1">
                              {track.track.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                            </h1>
                          </div>
                        </td>
                        {!isMobile && <td>{track.track.album.name}</td>}
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
