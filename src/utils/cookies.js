// Cookie utility functions for authentication token management

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
};

export const setCookie = (name, value, options = {}) => {
  let cookieString = `${name}=${value}`;

  if (options.expires) {
    const date = new Date();
    date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

export const deleteCookie = (name, path = "/") => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
};

export const getAuthToken = () => {
  return (
    getCookie("authToken") || getCookie("token") || getCookie("accessToken")
  );
};

export const setAuthToken = (token, options = {}) => {
  const defaultOptions = {
    expires: 7,
    path: "/",
    secure: window.location.protocol === "https:",
    sameSite: "strict",
  };

  setCookie("authToken", token, { ...defaultOptions, ...options });
};

export const removeAuthToken = () => {
  deleteCookie("authToken");
  deleteCookie("token");
  deleteCookie("accessToken");
};
