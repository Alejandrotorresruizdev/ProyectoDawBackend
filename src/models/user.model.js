const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../utils/dbSetup')

const User = sequelize.define('usuarios', {
    idusuario: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roles_idroles:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
  }
)

module.exports = User;