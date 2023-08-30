import useFetchArtist from "../hooks/useFetchArtist";
import { useParams } from "react-router-dom";
import { getAccessTokenFromCookie } from "../utils/helpers";
import ArtistTopTracks from "../components/ArtistTopTracks";
import LoadingAnimation from "../img/loadingAnimation.gif";
import ArtistsAlbum from "../components/ArtistAlbum";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const accessToken = getAccessTokenFromCookie();
  const { data, isSuccess, isLoading, isError } = useFetchArtist({
    artistId,
    accessToken,
    autoFetch: true,
  });

  return (
    <section className="h-full">
      {isLoading && (
        <div className="h-full flex justify-center items-center ">
          <img className="h-20" src={LoadingAnimation} alt="" />
        </div>
      )}
      {isError && (
        <div className="h-full flex justify-center items-center ">
          <h1 className="font-semibold text-center text-white">
            Something went wrong, please try again
          </h1>
        </div>
      )}
      {isSuccess && (
        <>
          <section className="text-white flex justify-between items-end">
            <div>
              <p className="capitalize font-semibold">{data.type}</p>
              <h1 className="text-8xl font-bold my-5">{data.name}</h1>
              <p className="font-semibold">
                {data.followers.total.toLocaleString()} Followers
              </p>
            </div>
            <img
              className="h-52 rounded-md hidden md:block"
              src={data.images[2].url}
              alt=""
            />
          </section>
          <ArtistTopTracks artistId={artistId} />
          <ArtistsAlbum artistId={artistId} />
        </>
      )}
    </section>
  );
};

export default ArtistDetails;
