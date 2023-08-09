export const getFetchLimitByScreen = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1280) {
    // Extra-large screens (xl) - 6 columns
    return 6;
  } else if (screenWidth >= 1024) {
    // Large screens (lg) - 5 columns
    return 5;
  } else if (screenWidth >= 768) {
    // Medium screens (md) - 4 columns
    return 4;
  } else if (screenWidth >= 640) {
    // Small screens (sm) - 3 columns
    return 3;
  } else {
    // Extra small screens (xs) - 2 columns
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
