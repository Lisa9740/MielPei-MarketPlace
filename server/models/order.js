'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     this.User = this.belongsTo(models.User)

    }
  };
  Order.init({
    status: DataTypes.INTEGER,
    products: DataTypes.JSON,
    adresse:DataTypes.STRING,
    reference: DataTypes.STRING,
    exploitationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};