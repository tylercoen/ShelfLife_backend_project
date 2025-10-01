"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {}
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      publishedYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "Books",
      timestamps: true,
    }
  );
  return Book;
};
