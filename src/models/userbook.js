"use strict";

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBook extends Model {
    static associate(models) {
      UserBook.belongsTo(models.User, { foreignKey: "userId" });
      UserBook.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  UserBook.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("to-read", "reading", "completed"),
        defaultValue: "to-read",
      },
    },
    {
      sequelize,
      modelName: "UserBook",
      foreignKey: "bookId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  );
  return UserBook;
};
