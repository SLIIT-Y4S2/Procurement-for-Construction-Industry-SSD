const HEROKU_BACKEND_URL =
  "https://procument-backend-61616eb5472a.herokuapp.com/api";
const LOCALHOST_BACKEND_URL = "//localhost:5000/api";

export const BASE_API_URL = HEROKU_BACKEND_URL;

export const API_ROUTES = {
  GET_USER: `/sessions`,
  LOGIN: `/login`,
  REGISTER: `/register`,
  LOGOUT: `/logout`,
  DELETE_SESSION: `/sessions`,
  SITES: `/sites`,
  USER_MANAGEMENT: `/user-management`,
  ITEM_MANAGEMENT: `/items`,
  SUPPLIER_MANAGEMENT: `/suppliers`,
};

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SITES: "/sites",
  USERS_MANAGEMENT: "/users",
  ITEM_MANAGEMENT: "/items",
};

export const breadcrumbNameMap: Record<string, string> = {
  "/apps": "Application List",
  "/sites": "Construction Site",
};

export const COMPANY_MANAGER_ROUTES = [
  APP_ROUTES.HOME,
  APP_ROUTES.USERS_MANAGEMENT,
  APP_ROUTES.SITES,
  APP_ROUTES.ITEM_MANAGEMENT,
];
export const PROCUREMENT_STAFF_ROUTES = [APP_ROUTES.HOME, APP_ROUTES.SITES];
export const SUPPLIER_ROUTES = [APP_ROUTES.HOME];
