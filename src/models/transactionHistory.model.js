const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");
const User = require("./user.model");

const UserTransaction = sequelize.define(
  "user_transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 50], // Optional: restrict length
      },
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // SQL default timestamp
      field: "created_on",
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
User.hasMany(UserTransaction, { foreignKey: "userId" });
UserTransaction.belongsTo(User, { foreignKey: "userId" });

module.exports = UserTransaction;
