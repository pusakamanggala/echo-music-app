import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const About = ({ show }) => {
  return (
    <section className="fixed inset-0 flex flex-col space-y-4 items-center justify-center z-50 h-dvh w-screen bg-black/75 bg-opacity-30">
      <div className="h-4/6 w-4/6 relative overflow-hidden flex flex-col md:space-y-10 space-y-6 items-center justify-center bg-blue-300 md:p-5 md:text-base p-8 rounded-lg font-semibold text-xs">
        <button
          onClick={() => show(false)}
          title="Close About"
          type="button"
          className="absolute top-5 right-5 border-2 hover:border-black px-2 py-1 rounded-full"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </button>
        <section className="md:text-center text-justify">
          <h1 className="mb-2">
            This app is a personal project created by Pusaka Manggala and has no
            official affiliation with Spotify. This app is the result of
            personal learning and experimentation, and is not approved,
            endorsed, or maintained by Spotify. All trademarks, brand names, and
            content associated with Spotify are the property of their respective
            owners.
          </h1>
          <h1>
            While you can interact with the player's controls, it won't play
            actual songs due to technical constraints. For an immersive music
            streaming experience, it is recommended to use official Spotify
            music streaming platforms.
          </h1>
        </section>
        <section>
          <h1>
            Visit my{" "}
            <a
              href="https://github.com/pusakamanggala/echo-music-app"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:underline"
            >
              repository
            </a>{" "}
            for more detail of this project.
          </h1>
        </section>
      </div>
    </section>
  );
};

About.propTypes = {
  show: PropTypes.func.isRequired,
};

export default About;
