import { useContext } from "react";
import NowPlayingContext from "../context/NowPlayingProvider";
import useFetchTrack from "../hooks/useFetchTrack";
useFetchTrack;
import { getAccessTokenFromCookie } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useFetchArtist from "../hooks/useFetchArtist";
import LoadingAnimation from "../img/LoadingAnimation.gif";

const PlayingView = () => {
  const accessToken = getAccessTokenFromCookie();
  const { nowPlaying, setPlayingView } = useContext(NowPlayingContext);
  const { data, isLoading, isError, isSuccess } = useFetchTrack({
    accessToken,
    trackId: nowPlaying,
    autoFetch: nowPlaying ? true : false,
  });

  const { data: artistData, isSuccess: isArtistSuccess } = useFetchArtist({
    accessToken,
    artistId: isSuccess ? data.artists[0].id : null,
    autoFetch: isSuccess ? true : false,
  });

  return (
    <>
      {isLoading && (
        <section className="h-full flex justify-center items-center">
          <img className="w-28" src={LoadingAnimation} alt="" />
        </section>
      )}
      {isError && (
        <section className="h-full flex justify-center items-center">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </section>
      )}
      {isSuccess && (
        <>
          <div className="flex items-center mb-4">
            <h1 className="font-bold ">{data.name}</h1>
            <button
              type="button"
              title="Close Playing View"
              onClick={() => setPlayingView(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <img
            src={data.album.images[0].url}
            alt="Song Cover"
            className="rounded-lg mr-2 w-full"
          />
          <section className="my-4">
            <h1 className="font-semibold text-xl">{data.name}</h1>
            <h2 className="text-gray-400">
              {data.artists.map((artist) => artist.name).join(", ")}
            </h2>
          </section>
          {isArtistSuccess && (
            <section className="my-4">
              <img
                src={artistData.images[0].url}
                alt=""
                className="w-full rounded-lg"
              />
              <h1 className="text-xl font-bold">{artistData.name}</h1>
              <h2 className="capitalize">{artistData.type}</h2>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default PlayingView;
