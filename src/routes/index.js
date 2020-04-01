const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");

const { checkTokenMidleware,NotFoundMiddleware,CheckIdUserMidleware } = require('../middlewares');

module.exports = function({UserRoutes,AuthRoutes,CommentRoutes,PostRoutes}) {
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
  apiRoutes.use('/comment',CommentRoutes);
  
  // Base api path
  router.use('/v1/api', apiRoutes);

  router.use(NotFoundMiddleware);

  return router;
};
