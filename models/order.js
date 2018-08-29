'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    UserId: DataTypes.INTEGER,
    CourierId: DataTypes.INTEGER,
    PackageId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};