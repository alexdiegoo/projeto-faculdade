'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pagamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pagamento.init({
    valor: DataTypes.FLOAT,
    alunoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pagamento',
  });
  return Pagamento;
};