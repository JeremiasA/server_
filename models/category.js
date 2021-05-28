'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Category name is required"
        }
      }
      
    },
    description: DataTypes.STRING,
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};