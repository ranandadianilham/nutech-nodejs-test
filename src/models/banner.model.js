const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");

const Banner = sequelize.define(
  "Banners",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bannerName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "banner_name",
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "banner_image",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Banner;
