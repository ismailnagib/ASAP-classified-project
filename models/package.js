'use strict';
module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    size: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    isFragile: DataTypes.BOOLEAN
  }, {});
  Package.associate = function(models) {
    // associations can be defined here
  };
  return Package;
};