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
  }, {
    hooks: {
      beforeCreate : (input , options) => {
        input.UserId = 1
        input.CourierId = 1        
      },
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
  };
  return Order;
};