const HEROKU_BACKEND_URL =
  "https://procument-backend-61616eb5472a.herokuapp.com/api";
const LOCALHOST_BACKEND_URL = "//localhost:5000/api";

// console.log("process.env.RUNNING_ENVIRONMENT", process.env.RUNNING_ENVIRONMENT);

export const BASE_API_URL =
  process.env.RUNNING_ENVIRONMENT == "DEVELOPMENT"
    ? LOCALHOST_BACKEND_URL
    : HEROKU_BACKEND_URL;

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
  ORDER_MANAGEMENT: `/orders`,
};

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SITES: "/sites",
  USERS_MANAGEMENT: "/users",
  ITEM_MANAGEMENT: "/items",
  ORDER_MANAGEMENT: {
    ALL_ORDER: `/orders`,
    PENDING_ORDER: `/orders/pending`,
    APPROVED_ORDER: `/orders/approved`,
  },
};

export const breadcrumbNameMap: Record<string, string> = {
  "/apps": "Application List",
  [APP_ROUTES.SITES]: "Construction Site",
  [APP_ROUTES.USERS_MANAGEMENT]: "User Management",
  [APP_ROUTES.ITEM_MANAGEMENT]: "Item Management",
  [APP_ROUTES.ORDER_MANAGEMENT.ALL_ORDER]: "Order Management",
};

export const COMPANY_MANAGER_ROUTES = [
  APP_ROUTES.HOME,
  APP_ROUTES.USERS_MANAGEMENT,
  APP_ROUTES.SITES,
  APP_ROUTES.ITEM_MANAGEMENT,
  ...Object.values(APP_ROUTES.ORDER_MANAGEMENT),
];
export const PROCUREMENT_STAFF_ROUTES = [APP_ROUTES.HOME, APP_ROUTES.SITES];
export const SUPPLIER_ROUTES = [APP_ROUTES.HOME];
