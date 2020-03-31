const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils");
const errorsFunctions = require("../utils/errorHttp");

const {
  CODE_BAD_REQUEST,
  CODE_UNAUTHORIZED
} = require("../constants/httpCodes");

module.exports = (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!token) {
    return res.send(errorsFunctions.error(CODE_BAD_REQUEST, "El token debe ser enviado"));
  }

  jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
    if (err) {
      return res.send(errorsFunctions.error(CODE_UNAUTHORIZED, "El token no es válido"));
    }

    req.user = decodedToken.user;
    next();
  });
};
