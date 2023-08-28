import { useState } from "react";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrowseTopResult from "../components/BrowseTopResult";
import BrowseTrackResult from "../components/BrowseTrackResult";
import useSearchSpotifyItem from "../hooks/useSearchSpotifyItem";
import { getAccessTokenFromCookie } from "../utils/helpers";
import BrowsePlaylistResult from "../components/BrowsePlaylistResult";
import BrowseArtistResult from "../components/BrowseArtistResult";
import Categories from "../components/Categories";

const Browse = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const accessToken = getAccessTokenFromCookie();

  // fetch one data here to check if the searchQuery is exist
  const { data, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: 1,
    searchQuery: searchQuery,
    searchType: ["playlist", "track", "artist"],
    autoFetch: searchQuery !== "" ? true : false, // only fetch when searchQuery is not empty
  });

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div
        className={`rounded-3xl md:w-96 bg-slate-600/70 border-2 p-3 flex items-center ${
          isFocused ? "border-white" : "border-transparent"
        }`}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
        <input
          title="Browse Item"
          autoFocus
          type="text"
          value={searchQuery}
          className="h-full w-full ml-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          placeholder="What do you want to listen to?"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!inputValue.startsWith(" ")) {
              // Check if it doesn't start with a space
              setSearchQuery(inputValue);
            }
          }}
        />
        <FontAwesomeIcon
          icon={faXmark}
          className="text-white"
          size="lg"
          onClick={() => setSearchQuery("")}
        />
      </div>
      {!searchQuery && <Categories />}
      {isSuccess && searchQuery && searchQuery !== "" && (
        <>
          <div className="grid grid-cols-2 gap-6">
            {data.playlists.items.length > 0 && (
              <BrowseTopResult searchQuery={searchQuery} />
            )}
            {data.tracks.items.length > 0 && (
              <BrowseTrackResult searchQuery={searchQuery} />
            )}
          </div>
          {data.playlists.items.length > 0 && (
            <BrowsePlaylistResult searchQuery={searchQuery} />
          )}
          {data.artists.items.length > 0 && (
            <BrowseArtistResult searchQuery={searchQuery} />
          )}
        </>
      )}

      {isSuccess &&
        data.playlists.items.length < 1 &&
        data.artists.items.length < 1 &&
        data.tracks.items.length < 1 && (
          <div className=" h-full flex justify-center text-white items-center ">
            <div className="text-center">
              <h1 className="font-bold text-2xl mb-2">
                No result found for &quot;{searchQuery}&quot;
              </h1>
              <h1>
                Please make sure your words are spelled correctly, or use fewer
                or different keywords.
              </h1>
            </div>
          </div>
        )}
      {isError && (
        <div className=" h-full flex justify-center text-white items-center ">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </div>
      )}
    </div>
  );
};

export default Browse;
