const { createContainer, asClass, asValue, asFunction } = require("awilix");

// config
const config = require("../utils");
const server = require("./index");

// services
const { UserService } = require("../services");

// controllers
const { UserController } = require("../controllers");

// routes
const { UserRoutes } = require("../routes/index.routes");
const Routes = require('../routes');

// models
const { User } = require("../models");

// repositories
const { UserRepository } = require("../repositories");

const container = createContainer();

container
  .register({
    server: asClass(server).singleton(),
    config: asValue(config),
    router : asFunction(Routes).singleton()
  })
  .register({
    UserRoutes: asFunction(UserRoutes).singleton()
  })
  .register({
    User: asValue(User)
  })
  .register({
    UserController: asClass(UserController).singleton()
  })
  .register({
    UserService: asClass(UserService).singleton()
  })
  .register({
    UserRepository: asClass(UserRepository).singleton()
  });

module.exports = container;
