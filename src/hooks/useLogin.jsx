import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const loginMutation = useMutation(() =>
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          throw new Error(errorData.error_description);
        });
      }
      return res.json();
    })
  );

  if (loginMutation.isError) {
    alert(
      "Something went wrong, please try again later. Or contact the developer at https://pusakamanggala.netlify.app/."
    );
    loginMutation.reset();
  }

  if (loginMutation.isSuccess) {
    // Set the access token to a cookie with a maximum age of 3600 seconds (1 hour)
    document.cookie = `access_token=${loginMutation.data.access_token};max-age=3600`;
    loginMutation.reset();

    // Reload the page
    window.location.reload();
  }

  return loginMutation;
};

export default useLogin;
