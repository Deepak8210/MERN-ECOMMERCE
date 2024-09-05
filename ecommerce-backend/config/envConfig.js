export const envConfig = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  mongo_uri: process.env.MONGO_URI,
  jwt_short_expiry: process.env.JWT_SHORT_EXPIRY,
  jwt_long_expiry: process.env.JWT_LONG_EXPIRY,
};
