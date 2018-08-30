'use strict';
module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    size: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    isFragile: DataTypes.BOOLEAN
  }, {});
  Package.associate = function(models) {
    Package.hasOne(models.Order)
  };
  return Package;
};