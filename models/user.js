'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    isLoggedIn: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Courier, {through: models.Order})
  };
  return User;
};