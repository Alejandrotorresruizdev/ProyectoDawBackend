const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/dbSetup.utils");
const { User } = require("./index");
const { Post } = require("./index");

const Like = sequelize.define("publicaciones", {
  id: {
    field: "idlike",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarios_idusuarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
      field: 'idusuario'
    },
    validate: {
      notNull: { msg: "El id de usuario es obligatorio" }
    }
  },
  publicaciones_idpublicaciones: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
      field: 'idpublicacion'
    },
    validate: {
      notNull: { msg: "El id de la publicación es obligatorio" }
    }
  },
});

module.exports = Like;
