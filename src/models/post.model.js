const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/dbSetup.utils");


const Post = sequelize.define("usuarios", {
  id: {
    field: 'idpublicacion',
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El titulo es obligatorio" }
    }
  },
  cuerpo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El cuerpo es obligatorio" }
    }
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuarios_idusuarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "El id de usuario es obligatorio" }
    }
  }
});

module.exports = Post;
