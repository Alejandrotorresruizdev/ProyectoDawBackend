const { CODE_BAD_REQUEST } = require("../constants/httpCodes");
const responseFunctions = require("../utils/responseHttp.utils");

module.exports = (req, res, next) =>  res.status(CODE_BAD_REQUEST).send(responseFunctions.error(CODE_BAD_REQUEST, "Recurso no encontrado"));
