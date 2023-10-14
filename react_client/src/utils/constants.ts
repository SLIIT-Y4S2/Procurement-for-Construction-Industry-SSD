const HEROKU_BACKEND_URL =
  "https://procument-backend-61616eb5472a.herokuapp.com/api";
const LOCALHOST_BACKEND_URL = "http://localhost:5000/api";

export const BASE_API_URL = HEROKU_BACKEND_URL;

export const API_ROUTES = {
  GET_USER: `/sessions`,
  LOGIN: `/login`,
  REGISTER: `/register`,
  LOGOUT: `/logout`,
  DELETE_SESSION: `/sessions`,
  SITES: `/sites`,
  USER_MANAGEMENT: `/user-management`,
};

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SITES: "/sites",
  USERS_MANAGEMENT: "/user-management",
};

export const breadcrumbNameMap: Record<string, string> = {
  "/apps": "Application List",
  "/sites": "Construction Site",
};
