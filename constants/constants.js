const API_STATUS_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  AUTHORIZATION_FAILED_CODE: 401,
  ERROR_CODE: 400,
  INTERNAL_SERVER_ERROR: 500,
  DUPLICATE_ENTRY_CODE: 400,
};
const RESPONSE_MESSAGES = {
  SUCCESS: "Success",
  ACCOUNT_CREATED :"account created successfuly",
  AUTHORIZATION_FAILED: "Authorization failed",
  DUPLICATE_ENTRY: "email already exist.",
  LOGGED_IN: "succesfuly logged in",
  MEAL_ADDED: "meal added successfully",
  INCORRECT_CREDENTIALS :"inavlid email or passward"
  
};

const APP_ENVIRONMENTS = {
  LOCAL: "local",
  DEV: "dev",
  STAGING: "staging",
  PRODUCTION: "production",
};

const JWT_TOKEN =
  "eyJhbGciOiJ$IUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzIzNTYyYjlkNTZkNjY1Yjk0NDkzYyIsInVzZXJOYW1lIjoibWFzaG9vZCBSYWZpIiwiaWF0IjoxNjIzMzQxNzU2fQ.vfJCCeMRdEhzkJEwgJybJ95zFm0eYuiYvUDpi2q3Of8";

const ROLES = {
  USER: 1,
  ADMIN: 2,
};

module.exports = {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
  APP_ENVIRONMENTS,
  JWT_TOKEN,
  ROLES,
};
