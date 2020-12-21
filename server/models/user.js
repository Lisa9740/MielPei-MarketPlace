'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.Role = this.belongsTo(models.Role)
        this.Cart = this.belongsTo(models.Cart)
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId : DataTypes.INTEGER,
    cartId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};