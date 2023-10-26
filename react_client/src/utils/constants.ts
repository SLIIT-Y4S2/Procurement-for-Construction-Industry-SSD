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
  PENDING_APPROVALS_COMPANY_MANGER: "/orders/pending-approval/company-manager", // get all pending approvals for company manager
  ORDERS_FOR_PROCUREMENT_STAFF: "/procurement-staff", // get all pending approvals for company manager
  ORDERS_FOR_SUPPLIER: "/supplier", // get all pending approvals for company manager
};

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SITES: "/sites",
  USER_MANAGEMENT: "/users",
  ITEM_MANAGEMENT: "/items",
  ORDER_HISTORY: `/orders`,
  PENDING_APPROVALS: "/pending-approvals",
  POLICY_MANAGEMENT: {
    POLICIES: "/policies",
    HIERARCHY: "/policies/hierarchy",
  },
  PURCHASE_ORDER_PROCUREMENT_STAFF: "/procurement-staff/purchase-orders",
  PURCHASE_ORDER_SUPPLIER: "/supplier/purchase-orders",
  DELIVERIES_SUPPLIER: "/supplier/deliveries",
  ORDER_HISTORY_SUPPLIER: "/supplier/order-history",
  INVOICES_SUPPLIER: "/supplier/invoices",
  INVOICES_COMPANY_MANAGER: "/invoices",
};

export const breadcrumbNameMap: Record<string, string> = {
  "/apps": "Application List",
  [APP_ROUTES.SITES]: "Construction Site",
  [APP_ROUTES.USER_MANAGEMENT]: "User Management",
  [APP_ROUTES.ITEM_MANAGEMENT]: "Item Management",
  [APP_ROUTES.ORDER_HISTORY]: "Order Management",
  [APP_ROUTES.PENDING_APPROVALS]: "pending-approvals",
  [APP_ROUTES.POLICY_MANAGEMENT.POLICIES]: "Policies",
  [APP_ROUTES.POLICY_MANAGEMENT.HIERARCHY]: "Policies-hierarchy",
  "/procurement-staff": "Procurement Staff",
  [APP_ROUTES.PURCHASE_ORDER_PROCUREMENT_STAFF]: "Purchase Order",
  "/supplier": "Supplier",
  [APP_ROUTES.PURCHASE_ORDER_SUPPLIER]: "Purchase Order",
  [APP_ROUTES.DELIVERIES_SUPPLIER]: "Deliveries",
  [APP_ROUTES.ORDER_HISTORY_SUPPLIER]: "Order History",
  [APP_ROUTES.INVOICES_SUPPLIER]: "Invoices",
  [APP_ROUTES.INVOICES_COMPANY_MANAGER]: "Invoices",
};

export const COMPANY_MANAGER_ROUTES = [
  APP_ROUTES.HOME,
  APP_ROUTES.USER_MANAGEMENT,
  APP_ROUTES.SITES,
  APP_ROUTES.ITEM_MANAGEMENT,
  APP_ROUTES.PENDING_APPROVALS,
  APP_ROUTES.INVOICES_COMPANY_MANAGER,
  APP_ROUTES.ORDER_HISTORY,
  ...Object.values(APP_ROUTES.POLICY_MANAGEMENT),
];
export const PROCUREMENT_STAFF_ROUTES = [
  APP_ROUTES.HOME,
  APP_ROUTES.PURCHASE_ORDER_PROCUREMENT_STAFF,
  APP_ROUTES.ORDER_HISTORY,
];

export const SUPPLIER_ROUTES = [
  APP_ROUTES.HOME,
  APP_ROUTES.PURCHASE_ORDER_SUPPLIER,
  APP_ROUTES.DELIVERIES_SUPPLIER,
  APP_ROUTES.ORDER_HISTORY_SUPPLIER,
  APP_ROUTES.INVOICES_SUPPLIER,
];
