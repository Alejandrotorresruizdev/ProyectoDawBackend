"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      texto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El texto es obligatorio" },
        },
      },
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Comment.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
  };
  return Comment;
};
