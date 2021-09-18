const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
require("dotenv").config();

module.exports = (context) => {
  const authHeaders = context.req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expire Token");
      }
    }
    throw new Error("Authentication must be 'Bearer [token]");
  }
  throw new Error("Authorization Headers must be provided");
};
