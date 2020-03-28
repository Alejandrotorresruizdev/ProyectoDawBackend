const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../utils/dbSetup");

const User = sequelize.define("usuarios", {
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El nombre completo del usuario es obligatorio" }
    }
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El nombre de usuario es obligatorio" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roles_idroles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "El rol de usuario es obligatorio" }
    }
  }
});

module.exports = User;
