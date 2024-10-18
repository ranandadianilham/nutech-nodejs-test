const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");
const User = require("./user.model");

const UserBalance = sequelize.define(
  "user_balance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      // from user table
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // SQL default timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Initialized with current time
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

User.hasMany(UserBalance, { foreignKey: "userId" });
UserBalance.belongsTo(User, { foreignKey: "userId" });

module.exports = UserBalance;
