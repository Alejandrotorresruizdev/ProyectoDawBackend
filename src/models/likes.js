"use strict";
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {}
  );
  Likes.associate = function (models) {
    Likes.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Likes.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
  };
  return Likes;
};
