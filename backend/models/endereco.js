'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Endereco.init({
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    alunoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Endereco',
  });
  return Endereco;
};