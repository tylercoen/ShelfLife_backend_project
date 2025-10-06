"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });

      Review.belongsTo(models.Book, {
        foreignKey: "bookId",
        onDelete: "CASCADE",
      });
    }
  }
  Review.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      bookId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
