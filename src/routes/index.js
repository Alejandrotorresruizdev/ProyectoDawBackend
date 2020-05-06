const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const fileupload = require("express-fileupload");

require("express-async-errors");

const {
  checkTokenMidleware,
  NotFoundMiddleware,
  CheckRolMiddleware,
  ErrorMiddleware,
} = require("../middlewares");

const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH } = require("../utils");
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({
  UserRoutes,
  AuthRoutes,
  CommentRoutes,
  PostRoutes,
  LikeRoutes,
  AdminRoutes
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes
    .use(express.json())
    .use(helmet())
    .use(
      fileupload({
        createParentPath: true,
      })
    )
    .use(compression());
 
  // Model path
  apiRoutes.use("/user", [checkTokenMidleware], UserRoutes);
  apiRoutes.use("/auth", AuthRoutes);
  apiRoutes.use("/post", PostRoutes);
  apiRoutes.use("/comment", CommentRoutes);
  apiRoutes.use("/like", [checkTokenMidleware], LikeRoutes);
  apiRoutes.use("/admin", [checkTokenMidleware,CheckRolMiddleware], AdminRoutes);

  // Document path
  apiRoutes.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  // Base api path
  router.use("/v1/api", apiRoutes);

  router.use(cors({ credentials: true, origin: true }));
  router.options("*", cors());
  router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});


  apiRoutes.use('/uploads',(express.static('uploads')));

  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
