'use strict';
module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    size: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Not a number'
        }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Not a number'
        }
      }
    },
    isFragile: DataTypes.BOOLEAN
  }, {});
  Package.associate = function(models) {
    Package.hasOne(models.Order)
  };
  return Package; 
};