module.exports = {
  checkTokenMidleware: require("./checkToken.middleware"),
  NotFoundMiddleware: require("./not-found.middleware"),
  CheckRolMiddleware: require("./checkRol.middleware"),
  ErrorMiddleware: require("./error.middleware")
};
