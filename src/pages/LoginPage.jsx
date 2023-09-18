import { useState } from "react";
import useLogin from "../hooks/useLogin";
import Screenshot from "../img/screenshot.png";
import About from "../components/About";

const LoginPage = () => {
  const [showAbout, setShowAbout] = useState(false);
  const login = useLogin();

  const handleLogin = () => {
    login.mutate();
  };

  return (
    <div className="gradient-background h-dvh md:grid md:grid-cols-2 ">
      <div className="h-full overflow-hidden md:block hidden ">
        <img
          src={Screenshot}
          className="object-cover object-right h-full"
          alt="App Screenshot"
        />
      </div>
      <div className="absolute top-5 right-5 text-white">
        <button onClick={() => setShowAbout(true)} title="About" type="button">
          About
        </button>
      </div>
      {showAbout && <About show={setShowAbout} />}
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
          onClick={() => handleLogin()}
        >
          {login.isLoading ? "Loading..." : "Take me in !"}
        </button>
      </div>
      <footer className="absolute bottom-5 right-5 text-white">
        Made with &lt;3 by{" "}
        <a
          href="https://pusakamanggala.netlify.app/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Pusaka Manggala
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;
