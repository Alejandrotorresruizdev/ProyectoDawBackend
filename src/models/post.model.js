const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbSetup.utils");
const { User } = require("./index");

const Post = sequelize.define("publicaciones", {
  id: {
    field: "idpublicacion",
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
  }
});

module.exports = Post;
