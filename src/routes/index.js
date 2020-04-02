const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");

const { checkTokenMidleware,NotFoundMiddleware,ErrorMiddleware } = require('../middlewares');

const swaggerUI = require('swagger-ui-express');
const {SWAGGER_PATH} = require('../utils');
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function({UserRoutes,AuthRoutes,CommentRoutes,PostRoutes,LikeRoutes}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression());

  // Model path
  apiRoutes.use('/user', [checkTokenMidleware],UserRoutes);
  apiRoutes.use('/auth',AuthRoutes);
  apiRoutes.use('/post', [checkTokenMidleware],PostRoutes);
  apiRoutes.use('/comment',[checkTokenMidleware],CommentRoutes);
  apiRoutes.use('/like',[checkTokenMidleware],LikeRoutes);

  // Document path
  apiRoutes.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerDocument))

  // Base api path
  router.use('/v1/api', apiRoutes);

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
