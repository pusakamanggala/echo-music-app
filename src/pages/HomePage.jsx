import React from "react";
import bannerImg from "../img/banner.jpg";

const HomePage = () => {
  const topSongs = [
    { id: 1, title: "Song 1", artist: "Artist 1", image: "song1.jpg" },
    { id: 2, title: "Song 2", artist: "Artist 2", image: "song2.jpg" },
    { id: 3, title: "Song 3", artist: "Artist 3", image: "song3.jpg" },
    { id: 4, title: "Song 3", artist: "Artist 3", image: "song3.jpg" },
    { id: 5, title: "Song 3", artist: "Artist 3", image: "song3.jpg" },
    // Add more songs as needed
  ];

  return (
    <div>
      {/* Banner */}
      <div className="bg-black h-96 rounded-lg text-white overflow-hidden relative w-full">
        <img
          src={bannerImg}
          alt="banner"
          className="h-full w-full object-cover"
        />
      </div>
      {/* New Releases */}
      <div className="flex justify-between items-center text-white">
        <h1 className="my-8 text-xl font-semibold">New Releases</h1>
        <h1 className="font-semibold">Show all</h1>
      </div>
      <div className="grid grid-cols-5 gap-4 ">
        {topSongs.map((song) => (
          <div key={song.id} className="bg-black rounded-lg p-4 shadow-md ">
            <img
              src={song.image}
              alt={song.title}
              className="w-full mb-2 rounded-md"
            />
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-gray-500">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
