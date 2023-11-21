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
import useIsMobile from "../hooks/useIsMobile";
import { useDebounce } from "use-debounce";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const accessToken = getAccessTokenFromCookie();
  const isMobile = useIsMobile();

  const debounceDelay = searchQuery ? 1000 : 0; // Set the debounce delay to 1000ms if searchQuery is not empty, otherwise 0ms (no debounce)
  const [debouncedSearchQuery] = useDebounce(searchQuery, debounceDelay);

  const { data, isError, isSuccess } = useSearchSpotifyItem({
    accessToken,
    limit: 1,
    searchQuery: debouncedSearchQuery,
    searchType: ["playlist", "track", "artist"],
    autoFetch: debouncedSearchQuery !== "" ? true : false,
  });

  return (
    <div className="flex flex-col">
      {/* Search Bar */}
      <div
        className={`rounded-3xl md:w-96 bg-slate-600/70 border-2 p-3 flex items-center ${
          isFocused ? "border-white" : "border-transparent"
        }`}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
        <input
          title="Browse Item"
          name="Browse Item"
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
      {!debouncedSearchQuery && <Categories />}
      {isSuccess && debouncedSearchQuery && debouncedSearchQuery !== "" && (
        <>
          {isMobile ? (
            <div className="grid gap-6">
              {data.tracks.items.length > 0 && (
                <BrowseTrackResult searchQuery={debouncedSearchQuery} />
              )}
              {data.playlists.items.length > 0 && (
                <BrowseTopResult searchQuery={debouncedSearchQuery} />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {data.playlists.items.length > 0 && (
                <BrowseTopResult searchQuery={debouncedSearchQuery} />
              )}
              {data.tracks.items.length > 0 && (
                <BrowseTrackResult searchQuery={debouncedSearchQuery} />
              )}
            </div>
          )}

          {data.playlists.items.length > 0 && (
            <BrowsePlaylistResult searchQuery={debouncedSearchQuery} />
          )}
          {data.artists.items.length > 0 && (
            <BrowseArtistResult searchQuery={debouncedSearchQuery} />
          )}
        </>
      )}

      {isSuccess &&
        data.playlists.items.length < 1 &&
        data.artists.items.length < 1 &&
        data.tracks.items.length < 1 && (
          <div className="text-center text-white">
            <h1 className="font-bold text-2xl mb-2">
              No result found for &quot;{searchQuery}&quot;
            </h1>
            <h1>
              Please make sure your words are spelled correctly, or use fewer or
              different keywords.
            </h1>
          </div>
        )}
      {isError && (
        <div className="text-white">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </div>
      )}
    </div>
  );
};

export default Browse;
