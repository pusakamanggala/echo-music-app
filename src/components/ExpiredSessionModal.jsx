import { useSession } from "../context/SessionProvider";

const ExpiredSessionModal = () => {
  const { userSession } = useSession();

  return (
    !userSession && (
      <div className="fixed inset-0 flex flex-col space-y-4 items-center justify-center z-50 h-dvh w-screen bg-black/75 bg-opacity-30">
        <div className="h-4/6 w-4/6 relative overflow-hidden flex items-center justify-center">
          <div className="absolute text-white md:text-4xl text-xl font-semibold text-center mx-8">
            <h1>Sorry your session has ended</h1>
            <h1>please reload the page and re-enter</h1>
          </div>
          <a
            className="text-base absolute bottom-5 text-white right-5 hover:underline"
            href="https://developer.spotify.com/documentation/web-api/concepts/rate-limits"
            target="_blank"
            rel="noreferrer"
          >
            Learn more
          </a>
          <img
            src="https://wallpapercrafter.com/th800/15664-glass-drops-wet-rain-transparent-moody-window-4k.jpg"
            alt="Session Expired"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    )
  );
};

export default ExpiredSessionModal;
