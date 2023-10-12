export const BASE_API_URL = "http://localhost:5000/api";

export const API_ROUTES = {
  GET_USER: `/sessions`,
  LOGIN: `/login`,
  REGISTER: `/register`,
  LOGOUT: `/logout`,
  DELETE_SESSION: `/sessions`,
  SITES: `/sites`,
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
