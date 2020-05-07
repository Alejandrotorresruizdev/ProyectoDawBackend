const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils");
const responseFunctions = require("../utils/responseHttp.utils");

const {
  CODE_BAD_REQUEST,
  CODE_UNAUTHORIZED,
} = require("../constants/httpCodes");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"] ? req.headers["authorization"] : req.query.jwt;

  if (!token)
    return res.send(
      responseFunctions.error(CODE_BAD_REQUEST, "El token debe ser enviado")
    );

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err)
      return res.send(
        responseFunctions.error(CODE_UNAUTHORIZED, "El token no es válido")
      );

      req.id = decodedToken.user.id;
      req.rol = decodedToken.user.roles_idroles
      console.log(decodedToken.user)
    next();
  });
};
