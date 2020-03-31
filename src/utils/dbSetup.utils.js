const { Sequelize } = require('sequelize');
const container = require('../startup/container');
const {MYSQL_URI,MYSQL_DB,MYSQL_USER,MYSQL_PASS} = require('.');

const sequelize = new Sequelize(MYSQL_DB,MYSQL_USER, MYSQL_PASS, {
    host: MYSQL_URI,
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: false
  });

module.exports = sequelize;