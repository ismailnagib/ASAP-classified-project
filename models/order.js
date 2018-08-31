'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    UserId: DataTypes.INTEGER,
    CourierId: DataTypes.INTEGER,
    PackageId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN,
    rating: DataTypes.INTEGER,
    deliveredTime: DataTypes.DATE,
    arrivedTime: DataTypes.DATE
  }, {
    hooks: {
      afterCreate: (input, options) => {
        sequelize.models.Order.update({
          PackageId: input.id
        }, {
          where: {
            id: input.id
          }
        })
        .then( () => {
          console.log('test');
          
        })
        .catch(err => console.log(err))
        
      }
    }
  });
  Order.associate = function(models) {
    Order.belongsTo(models.Package)
    Order.belongsTo(models.User)
    Order.belongsTo(models.Courier)
  };
  return Order;
};