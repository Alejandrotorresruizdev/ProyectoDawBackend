const { Sequelize } = require('sequelize');
const {MYSQL_URI,MYSQL_DB,MYSQL_USER,MYSQL_PASS} = require('.');

const sequelize = new Sequelize("heroku_ff327546e53f9a3","b995a4247fce61","89c8710b", {
    host:"eu-cdbr-west-02.cleardb.net",
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: false
  });

module.exports = sequelize;