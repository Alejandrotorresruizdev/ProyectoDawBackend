const { CODE_INTERNAL_ERROR } = require("../constants/httpCodes");
const responseFunctions = require("../utils/responseHttp.utils");

module.exports = (err, req, res, next) =>  res.status(CODE_INTERNAL_ERROR).send(responseFunctions.error(CODE_INTERNAL_ERROR , err.message || "Ha ocurrido un error inexperado en el servidor"))


