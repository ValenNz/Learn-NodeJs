'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      this.belongsTo(models.admin)
      this.belongsTo(models.member)
      this.hasMany(models.details_of_borrow, {
        foreignKey: 'borrowID', as: 'details_of_borrow'
      })
    }
  }
  borrow.init({
    memberID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: "members",
        key: "id"
      },
    }, 
    
    adminID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model: "admins",
        key: "id"
      }
    },
    date_of_borrow: DataTypes.DATE,
    date_of_return: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'borrow',
  });
  return borrow;
};