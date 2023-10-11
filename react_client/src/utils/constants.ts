const API_URL = "//localhost:5000/api";

export const API_ROUTES = {
  GET_USER: `${API_URL}/sessions`,
  LOGIN: `${API_URL}/login`,
  REGISTER: `${API_URL}/register`,
  LOGOUT: `${API_URL}/logout`,
  DELETE_SESSION: `${API_URL}/sessions`,
};

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SITES: "/sites",
};

export const breadcrumbNameMap: Record<string, string> = {
  "/apps": "Application List",
  "/sites": "Construction Site",
};
