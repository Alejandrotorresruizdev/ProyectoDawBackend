const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");

module.exports = function({UserRoutes}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());

    
  // Model path
  apiRoutes.use('/user',UserRoutes);

  // Base api path
  router.use('/v1/api', apiRoutes);

  return router;
};
