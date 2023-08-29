import { useContext, useEffect, useState } from "react";
import useFetchArtistTopTracks from "../hooks/useFetchArtistTopTracks";
import { getAccessTokenFromCookie, msToMinuteSecond } from "../utils/helpers";
import NowPlayingContext from "../context/NowPlayingProvider";
import PropTypes from "prop-types";

const ArtistTopTracks = ({ artistId }) => {
  const accessToken = getAccessTokenFromCookie();
  const { handlePlayTrack } = useContext(NowPlayingContext);
  const [isShowAll, setIsShowAll] = useState(false);
  const [tracksData, setTracksData] = useState(null);

  const { data, isSuccess } = useFetchArtistTopTracks({
    accessToken,
    artistId,
  });

  useEffect(() => {
    if (isSuccess) {
      if (!isShowAll) {
        setTracksData(data.tracks.slice(0, 5));
      } else {
        setTracksData(data.tracks);
      }
    }
  }, [isSuccess, isShowAll, data, setTracksData]);

  return (
    <>
      {isSuccess && tracksData && (
        <section className="my-8">
          <h1 className="text-xl mb-2 text-white font-bold">Popular</h1>
          {tracksData.map((track, index) => (
            <div
              key={track.id}
              className="flex hover:bg-white/40 transition-colors duration-500 ease-in-out cursor-pointer p-2 rounded-md items-center "
              onClick={() => handlePlayTrack(track.id)}
            >
              <p className="text-white w-5 mr-5 text-end">{index + 1}</p>
              <img
                className="h-12 mr-3"
                src={track.album.images[1].url}
                alt={track.name}
              />
              <div className="flex justify-between w-full items-center text-white">
                <div className="flex flex-col">
                  <h1 className="font-semibold  line-clamp-1">
                    {track.explicit && (
                      <span className="bg-gray-300 px-1 mr-1 text-xs text-black rounded-sm">
                        E
                      </span>
                    )}
                    {track.name}
                  </h1>
                </div>
                <div>
                  <h1>{msToMinuteSecond(track.duration_ms)}</h1>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            title={
              isShowAll
                ? "Show less popular tracks"
                : "Show more popular tracks"
            }
            className="hover:underline hover:text-white cursor-pointer font-semibold text-gray-400"
            onClick={() => setIsShowAll(!isShowAll)}
          >
            {isShowAll ? "Show less" : "Show more"}
          </button>
        </section>
      )}
    </>
  );
};

ArtistTopTracks.propTypes = {
  artistId: PropTypes.string.isRequired,
};

export default ArtistTopTracks;
