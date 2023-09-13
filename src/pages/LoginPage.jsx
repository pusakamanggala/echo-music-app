import useLogin from "../hooks/useLogin";
import Screenshot from "../img/screenshot.png";

const LoginPage = () => {
  const clientId = "4c028baed0074747ab50de3ba9ac86b9";
  const clientSecret = "725be5fa28b749febd2b39ff7b971bc5";

  const login = useLogin(clientId, clientSecret);

  const handleLogin = () => {
    login.mutate();
  };

  if (login.isSuccess) {
    // set the access token to cookie with 1 hour expiration
    document.cookie = `access_token=${login.data.access_token};max-age=3600`;
    // reload the page
    window.location.reload();
  }
  return (
    <div className="gradient-background h-dvh md:grid md:grid-cols-2 ">
      <div className="h-full overflow-hidden md:block hidden ">
        <img
          src={Screenshot}
          className="object-cover object-right h-full"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-white font-semibold text-2xl md:text-4xl lg:text-5xl xl:text-8xl">
          Welcome
        </h1>
        <p className="text-white mb-8 text-base md:text-xl lg:text-2xl xl:text-4xl">
          to <span className="font-semibold">Echo</span> |{" "}
          <span className="text-green-500 font-semibold">Spotify</span> Clone
        </p>
        <button
          type="button"
          title="Login"
          className="text-white text-sm md:text-base lg:text-xl p-3 rounded-2xl bg-green-600 hover:bg-green-700 shadow-md"
          onClick={handleLogin}
        >
          Take me in !
        </button>
      </div>
      <footer className="absolute bottom-5 right-5 text-white">
        Made with &lt;3 by{" "}
        <a
          href="https://pusakamanggala.netlify.app/"
          target="_blank"
          className="hover:underline"
        >
          Pusaka Manggala
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;
