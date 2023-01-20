'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class details_of_borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.borrow)
      this.belongsTo(models.book)
    }
  }
  details_of_borrow.init({
    borrowID: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model:"borrows",
        key: "id"
      }
    },
    bookID: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id"
      }
    },
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'details_of_borrow',
  });
  return details_of_borrow;
};