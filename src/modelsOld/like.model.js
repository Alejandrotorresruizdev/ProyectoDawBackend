const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbSetup.utils");
const { User } = require("./index");
const { Post } = require("./index");

const Like = sequelize.define("likes", {
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
  publicaciones_idpublicacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "id",
      field: 'idpublicacion'
    },
    validate: {
      notNull: { msg: "El id de la publicación es obligatorio" }
    }
  },
});

module.exports = Like;
