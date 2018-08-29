'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courier = sequelize.define('Courier', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN
  }, {});
  Courier.associate = function(models) {
    Courier.belongsToMany(models.User, {through: models.Order})
  };
  return Courier;
};