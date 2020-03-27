const container = require('./src/startup/container');

const {MYSQL_URI} = container.resolve('config');

const server = container.resolve('server');

server.start();