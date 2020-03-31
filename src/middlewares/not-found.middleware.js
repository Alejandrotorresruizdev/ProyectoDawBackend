const { CODE_BAD_REQUEST } = require("../constants/httpCodes");
const errorsFunctions = require("../utils/errorHttp");

module.exports = (req, res, next) =>  res.status(CODE_BAD_REQUEST).send(errorsFunctions.error(CODE_BAD_REQUEST, "Recurso no encontrado"));
