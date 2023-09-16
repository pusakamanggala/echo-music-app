import { useContext } from "react";
import NowPlayingContext from "../context/NowPlayingProvider";
import useFetchTrack from "../hooks/useFetchTrack";
useFetchTrack;
import { getAccessTokenFromCookie } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useFetchArtist from "../hooks/useFetchArtist";
import LoadingAnimation from "../img/loadingAnimation.gif";
import ArtistTopTracks from "./ArtistTopTracks";
import useNavigateToArtistDetails from "../hooks/useNavigateToArtistDetails";
import useNavigateToAlbumDetails from "../hooks/useNavigateToAlbumDetails";
import MusicIcon from "../img/music-icon.jpg";

const PlayingView = () => {
  const accessToken = getAccessTokenFromCookie();
  const { nowPlaying, setPlayingView } = useContext(NowPlayingContext);
  const navigateToArtistDetails = useNavigateToArtistDetails();
  const navigateToAlbumDetails = useNavigateToAlbumDetails();

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
          <img
            className="w-28"
            src={LoadingAnimation}
            alt="Loading Animation"
          />
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
          <div className="flex items-center mb-4 justify-between">
            <h1
              className="line-clamp-1 hover:underline cursor-pointer"
              onClick={() => navigateToAlbumDetails(data.album.id)}
            >
              {data.name}
            </h1>
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
            alt={data.album.name}
            className="rounded-lg mr-2 w-full"
          />
          <section className="my-4">
            <h1
              className="font-semibold text-xl hover:underline cursor-pointer"
              onClick={() => navigateToAlbumDetails(data.album.id)}
            >
              {data.name}
            </h1>
            <h1 className="text-gray-400 line-clamp-1">
              {data.artists.map((artist, index) => (
                <span key={artist.id}>
                  <span
                    className="cursor-pointer hover:underline hover:text-white text-sm"
                    onClick={() => navigateToArtistDetails(artist.id)}
                  >
                    {artist.name}
                  </span>
                  {index !== data.artists.length - 1 && ", "}
                </span>
              ))}
            </h1>
          </section>
          <ArtistTopTracks artistId={data.artists[0].id} />
          {isArtistSuccess && (
            <section className="my-4">
              <img
                src={artistData.images[0]?.url || MusicIcon}
                alt={artistData.name || "Music Icon"}
                className="w-full rounded-lg"
              />
              <h1
                className="text-xl font-bold hover:underline cursor-pointer"
                onClick={() => navigateToArtistDetails(artistData.id)}
              >
                {artistData.name}
              </h1>
              <h2 className="capitalize">{artistData.type}</h2>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default PlayingView;
