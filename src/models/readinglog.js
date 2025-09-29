'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReadingLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReadingLog.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    currentPage: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ReadingLog',
  });
  return ReadingLog;
};