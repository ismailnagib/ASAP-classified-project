'use strict';
const Encryption = require('../controllers/encryption')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "Phone number should only contain numeric characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email address' invalid"
        },
        isUniqueCustom: function (value, next) {
          const Op = sequelize.Op
          User.find({
            where: {
              email: value,
              id: {
                [Op.ne]: this.id
              },
            }
          })
          .then(datum => {
            if (datum) {
              next('The email address has been registered before')
            } else {
              next()
            }
          })
        }
      }
    },
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 255],
          msg: "Password should contain at least 6 characters"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (User) => {
        User.password = Encryption.passwordGenerator(User.password);
      }
    }
  });
  User.associate = function(models) {
    User.belongsToMany(models.Courier, {through: models.Order})
  };
  return User;
};