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
        validate: {
          notNull: { msg: "El nombre de usuario es obligatorio" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roles_idroles: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        allowNull: false,
        validate: {
          notNull: { msg: "El rol de usuario es obligatorio" },
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Post, { as: "posts" });
    User.hasMany(models.Comment, { as: "comment" });
  };

  User.beforeCreate(async (user) => {
    const salt = await genSaltSync(10);
    const hashedPassword = await hashSync(user.password, salt);
    console.log(hashedPassword);
    user.password = hashedPassword;
  });

  return User;
};


