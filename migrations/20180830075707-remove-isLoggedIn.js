'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'isLoggedIn');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'isLoggedIn', Sequelize.BOOLEAN);
  }
};
