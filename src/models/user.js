"use strict";
const { hashSync, genSaltSync } = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El nombre completo del usuario es obligatorio" },
        },
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'El usuario ya existe'
        },
        validate: {
          notNull: { msg: "El nombre de usuario es obligatorio" },
        },
      },
      imagen:{
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'El email ya existe'
        },
      },
      roles_idroles: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        allowNull: false
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Post, { as: "post" });
    User.hasMany(models.Comment, { as: "comment" });
    User.hasMany(models.Likes, { as: "like" });
  };

  User.beforeCreate(async (user) => {
    const salt = await genSaltSync(10);
    const hashedPassword = await hashSync(user.password, salt);
    user.password = hashedPassword;
  });

  return User;
};


