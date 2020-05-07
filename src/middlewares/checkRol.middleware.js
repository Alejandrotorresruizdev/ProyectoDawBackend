const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils");
const responseFunctions = require("../utils/responseHttp.utils");

const {
  CODE_BAD_REQUEST,
  CODE_UNAUTHORIZED,
} = require("../constants/httpCodes");

module.exports = (req, res, next) => {
  console.log(rol)
  const { rol } = req;

  if (rol === 1) {
    next();
  } else {
    return res.send(
      responseFunctions.error(CODE_BAD_REQUEST, "No tienes permisos")
    );
  }
};
