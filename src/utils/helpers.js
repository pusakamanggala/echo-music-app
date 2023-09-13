export const getFetchLimitByScreen = (playingView = true) => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    // Extra-large screens (xl)
    return playingView ? 5 : 6;
  } else if (screenWidth >= 1024) {
    // Large screens (lg)
    return playingView ? 4 : 5;
  } else if (screenWidth >= 768) {
    // Medium screens (md)
    return playingView ? 3 : 4;
  } else if (screenWidth >= 640) {
    // Small screens (sm)
    return 3;
  } else {
    // Extra small screens (xs)
    return 2;
  }
};

export const getAccessTokenFromCookie = () => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();

    if (cookie.startsWith("access_token=")) {
      const accessTokenValue = cookie.split("=")[1];
      return accessTokenValue;
    }
    // else {
    //   // window.location.reload();
    // }
  }
};

export const msToMinuteSecond = (milliseconds) => {
  if (milliseconds < 0) {
    throw new Error("Milliseconds must be a non-negative integer.");
  }

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
};

export const msToSentence = (ms) => {
  const hours = Math.floor(ms / 3600000); // 1 hour = 3600000 milliseconds
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  let sentence = "";

  if (hours > 0) {
    sentence += `${hours} hr `;
  }

  if (minutes > 0 || (hours === 0 && seconds > 0)) {
    sentence += `${minutes} min `;
  }

  if (seconds > 0 && hours === 0) {
    sentence += `${seconds} sec`;
  }

  if (sentence === "") {
    sentence = "0 sec"; // Default to "0 sec" if there are no hours, minutes, or seconds
  }

  return sentence;
};
