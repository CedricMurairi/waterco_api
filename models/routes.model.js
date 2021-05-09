import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Route = sequelize.define('route', {
  route_id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: true
  }
}, {
  sequelize,
  tableName: 'routes',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "route_id" },
      ]
    },
  ]
});

export default Route
