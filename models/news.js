'use strict';
module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define('news', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: "title: Titulo requerido"}
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: "content: Contenido requerido"}
      }
    },
    keywords: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.INTEGER,
    subcategory: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  news.associate = function(models) {
    // associations can be defined here
  };
  return news;
};