const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");

const Services = sequelize.define(
  "services",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "service_name",
    },
    serviceCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "service_code",
    },
    serviceIcon: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "service_icon",
    },
    serviceTariff: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "service_tariff",
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

module.exports = Services