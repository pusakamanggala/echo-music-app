import { useState, useContext } from "react";
import useFetchLyric from "../hooks/useFetchLyric";
import NowPlayingContext from "../context/NowPlayingProvider";
import PropTypes from "prop-types";

const TrackLyric = ({ trackId, trackDurationMs }) => {
  const { data, isSuccess } = useFetchLyric({
    trackId,
  });

  const { trackProgress } = useContext(NowPlayingContext);
  const [isShowLyric, setIsShowLyric] = useState(false);

  // Function to determine the text color based on start time
  const getTextColor = (startTimeMs) => {
    // Calculate the current time in milliseconds based on trackProgress
    const currentTimeMs = (trackProgress / 100) * trackDurationMs;

    // Check if the current time is less than or equal to the start time
    if (currentTimeMs <= startTimeMs) {
      return "text-black";
    } else {
      return "text-white";
    }
  };

  return (
    isSuccess && (
      <section
        className={` ${
          isShowLyric ? "bg-sky-700" : "bg-white/20"
        } rounded-lg p-4  relative overflow-hidden`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-bold ">Lyrics</h1>
          <button
            title={isShowLyric ? "Close lyrics" : "Show lyrics"}
            className="border-white border-2 font-normal rounded-3xl px-3 py-1"
            onClick={() => setIsShowLyric(!isShowLyric)}
          >
            {isShowLyric ? "X" : "Show lyrics"}
          </button>
        </div>
        {isShowLyric && (
          <div className="flex flex-col mt-5 space-y-2 h-96 overflow-y-auto">
            {data.lines.map((line, index) => (
              <p
                key={index}
                className={` ${getTextColor(
                  parseInt(line.startTimeMs, 10)
                )} text-lg font-bold`}
              >
                {line.words}
              </p>
            ))}
          </div>
        )}
      </section>
    )
  );
};

TrackLyric.propTypes = {
  trackId: PropTypes.string.isRequired,
  trackDurationMs: PropTypes.number.isRequired,
};

export default TrackLyric;
