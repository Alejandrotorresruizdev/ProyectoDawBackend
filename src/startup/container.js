const { createContainer, asClass, asValue, asFunction } = require("awilix");

// config
const config = require("../utils");
const server = require("./index");

// services
const { UserService,AuthService,PostService} = require("../services");

// controllers
const { UserController, AuthController,CommentController,PostController } = require("../controllers");

// routes
const { UserRoutes,AuthRoutes,CommentRoutes,PostRoutes} = require("../routes/index.routes");
const Routes = require("../routes");

// models
const { User,Post } = require("../models");

// repositories
const { UserRepository,PostRepository } = require("../repositories");

const container = createContainer();

container
  .register({
    server: asClass(server).singleton(),
    config: asValue(config),
    router: asFunction(Routes).singleton()
  })
  .register({
    UserRoutes: asFunction(UserRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    CommentRoutes : asFunction(CommentRoutes).singleton(),
    PostRoutes : asFunction(PostRoutes).singleton()
  })
  .register({
    User: asValue(User),
    Post : asValue(Post)
  })
  .register({
    UserController: asClass(UserController).singleton(),
    AuthController: asClass(AuthController).singleton(),
    CommentController : asClass(CommentController).singleton(),
    PostController: asClass(PostController).singleton()
  })
  .register({
    UserService: asClass(UserService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    PostService: asClass(PostService).singleton()
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    PostRepository : asClass(PostRepository).singleton()
  });

module.exports = container;
