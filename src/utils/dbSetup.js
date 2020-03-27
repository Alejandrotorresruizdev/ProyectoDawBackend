const { Sequelize } = require('sequelize');
const container = require('../startup/container');
// const {MYSQL_URI,MYSQL_DB} = container.resolve('config');

const sequelize = new Sequelize('mydb','alejandro', 'kanaka123', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: false
  });

module.exports = sequelize;