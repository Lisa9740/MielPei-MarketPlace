'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdresseLivraison extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.User = this.belongsTo(models.User)
    }
  };
  AdresseLivraison.init({
    name: DataTypes.STRING,
    adresse: DataTypes.STRING,
    codePostal: DataTypes.INTEGER,
    commune: DataTypes.STRING,
    telephone: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AdresseLivraison',
  });
  return AdresseLivraison;
};