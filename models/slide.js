'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
   
    static associate(models) {
      Slide.belongsTo(models.Organization, {as: 'organization'});
    }
  
  };

  Slide.init({
    imageUrl: DataTypes.STRING,
    text: DataTypes.STRING,
    order: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Slide',
  });
  return Slide;
};