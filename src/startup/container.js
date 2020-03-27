const { createContainer, asClass, asValue, asFunction } = require('awilix');

// config
const config = require('../utils');
const server = require('./index');

// services

// controllers

// routes

// models

// repositories

const container = createContainer();

container
    .register({
        server: asClass(server).singleton(),
        config: asValue(config)
    })

module.exports = container;