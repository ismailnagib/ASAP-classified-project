'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    UserId: DataTypes.INTEGER,
    CourierId: DataTypes.INTEGER,
    PackageId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN,
    deliveredTime: DataTypes.DATE,
    arrivedTime: DataTypes.DATE
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};