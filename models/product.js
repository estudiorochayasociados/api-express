'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    price: DataTypes.DOUBLE
  }, {});
  Product.associate = function(models) {
    //
  };
  return Product;
};