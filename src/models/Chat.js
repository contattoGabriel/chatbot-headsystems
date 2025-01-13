import { DataTypes } from "sequelize";
const { sequelize } = require("../config/database");

const Chat = sequelize.define("Chat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("active", "closed"),
    defaultValue: "active",
  },
  context: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
});

module.exports = Chat;
