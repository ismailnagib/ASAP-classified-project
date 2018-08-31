'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courier = sequelize.define('Courier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "Phone number should only contain numeric characters"
        },
        len: {
          args: [10,13],
          msg: "Phone number should be 10 to 13 characters long"
        }
      }
    },
    rating: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN,
    ratedBy: DataTypes.INTEGER
  }, {});
  Courier.associate = function(models) {
    Courier.belongsToMany(models.User, {through: models.Order})
    Courier.hasMany(models.Order)
  };
  Courier.prototype.toggleAvailability = function() {
    if (this.isAvailable) {
      this.isAvailable = false;
    } else {
      this.isAvailable = true;
    }
  }
  return Courier;
};