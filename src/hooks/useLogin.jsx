import { useMutation } from "@tanstack/react-query";

const useLogin = (clientId, clientSecret) => {
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
          throw new Error(errorData.error_description); // Throw an Error with the error description
        });
      }

      return res.json();
    })
  );

  return loginMutation;
};

export default useLogin;
