import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faForwardStep,
  faBackwardStep,
  faPlay,
  faCircleExclamation,
  faVolumeLow,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import NowPlayingContext from "../context/NowPlayingProvider";
import useFetchTrack from "../hooks/useFetchTrack";
useFetchTrack;
import { getAccessTokenFromCookie, msToMinuteSecond } from "../utils/helpers";
import musicIcon from "../img/music-icon.jpg";
import useNavigateToArtistDetails from "../hooks/useNavigateToArtistDetails";
import useNavigateToAlbumDetails from "../hooks/useNavigateToAlbumDetails";

const SongPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [showNote, setShowNote] = useState(false);
  const accessToken = getAccessTokenFromCookie();

  const navigateToAlbumDetails = useNavigateToAlbumDetails();
  const navigateToArtistDetails = useNavigateToArtistDetails();

  const { nowPlaying, setPlayingView, playingView } =
    useContext(NowPlayingContext);

  const { data, isSuccess } = useFetchTrack({
    accessToken,
    trackId: nowPlaying,
    autoFetch: nowPlaying ? true : false,
  });

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleProgressChange = (event) => {
    const newProgress = parseInt(event.target.value);
    setProgress(newProgress);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
  };

  const volumeIcon = () => {
    let volumeIcon;

    if (volume === 0) {
      volumeIcon = faVolumeMute;
    } else if (volume < 50) {
      volumeIcon = faVolumeLow;
    } else {
      volumeIcon = faVolumeHigh;
    }

    return volumeIcon;
  };

  useEffect(() => {
    if (isPlaying && isSuccess && data) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (100 / data.duration_ms) * 1000;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isSuccess, data]);

  useEffect(() => {
    // Reset progress when a new song is played
    setProgress(0);
    setIsPlaying(true);
  }, [nowPlaying]);

  return (
    <>
      <div className="grid grid-cols-3 text-white">
        <div className="flex items-center">
          <img
            src={isSuccess ? data.album.images[2].url : musicIcon} // Replace with your song cover image URL
            alt="Song Cover"
            className="h-16 rounded-md mr-2"
          />
          <div className="song-details">
            {isSuccess && (
              <>
                <h1
                  className="line-clamp-1 hover:underline cursor-pointer"
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
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-evenly">
          <section
            className={`flex justify-center ${
              nowPlaying ? "text-white" : "text-gray-500"
            }`}
          >
            <button type="button" title="Previous">
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button
              type="button"
              title={isPlaying ? "Pause" : "Play"}
              onClick={togglePlayPause}
            >
              <FontAwesomeIcon
                className="mx-4"
                icon={nowPlaying && isPlaying ? faPauseCircle : faPlayCircle}
                size="2x"
                disabled={!nowPlaying}
              />
            </button>
            <button type="button" title="Next">
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
          </section>
          <section className="md:flex justify-center items-center text-sm text-gray-400 hidden">
            {isSuccess && (
              <p>{msToMinuteSecond((progress * data.duration_ms) / 100)}</p>
            )}
            <input
              title="Song Progress"
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="progress-bar mx-2"
              disabled={!nowPlaying}
            />
            {isSuccess && <p>{msToMinuteSecond(data.duration_ms)}</p>}
          </section>
        </div>
        <section className="flex justify-evenly items-center">
          {nowPlaying && (
            <button
              type="button"
              title="Now Playing View"
              className={`p-1 flex rounded-sm border-2 ${
                playingView ? "text-green-700 border-green-700" : "text-white"
              }`}
              onClick={() => setPlayingView(!playingView)}
            >
              <FontAwesomeIcon icon={faPlay} className="h-3" />
            </button>
          )}
          <div
            className={`md:flex justify-center items-center hidden ${
              nowPlaying ? "text-white" : "text-gray-500"
            }`}
          >
            <FontAwesomeIcon icon={volumeIcon()} className="mr-4" />
            <input
              title="Volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              className="progress-bar"
              onChange={handleVolumeChange}
              disabled={!nowPlaying}
            />
          </div>
          <div className="relative">
            {showNote && (
              <h1 className="text-xs m-2 absolute bottom-3 right-3 bg-white/60 text-black backdrop-blur-md w-80 p-2 rounded-md font-semibold text-justify">
                While you can interact with the player&apos;s controls, it
                won&apos;t play actual songs due to technical constraints. For
                an immersive music streaming experience, it is recommended to
                use official Spotify music streaming platforms.
              </h1>
            )}
            <button
              type="button"
              title="Note"
              className={` h-5 flex ${
                showNote ? "text-green-700" : "text-white animate-pulse"
              } `}
              onClick={() => setShowNote(!showNote)}
            >
              <FontAwesomeIcon icon={faCircleExclamation} className="h-full" />
            </button>
          </div>
        </section>
      </div>
      <input
        title="Song Progress"
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="progress-bar w-full block md:hidden mt-2"
        disabled={!nowPlaying}
      />
    </>
  );
};

export default SongPlayer;
