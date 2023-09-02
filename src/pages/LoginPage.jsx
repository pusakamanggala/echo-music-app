import useLogin from "../hooks/useLogin";

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
    <div className="h-dvh bg-sky-600 flex justify-center items-center">
      <button
        type="button"
        title="Login"
        className="text-white p-3 rounded-lg bg-green-600 shadow-md"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default LoginPage;
