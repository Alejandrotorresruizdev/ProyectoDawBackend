"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El titulo es obligatorio" },
        },
      },
      cuerpo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El cuerpo es obligatorio" },
        },
      },
      imagen: {
        type: DataTypes.STRING,
      },
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Post.associate = function (models) {
    Post.hasMany(models.Comment, { as: "comment" });
    Post.hasMany(models.Likes, { as: "likes" });
    Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };
  return Post;
};
