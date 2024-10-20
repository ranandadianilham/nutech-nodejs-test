const { DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");
const User = require("./user.model");

const UserProfile = sequelize.define(
  "user_profile",
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
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

User.hasMany(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

module.exports = UserProfile;