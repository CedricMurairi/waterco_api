import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Premise = sequelize.define('premise', {
    premise_id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    owner: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    consumption: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true
    },
    route_supplying: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'premises',
    timestamps: false,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        fields: [
            { name: "premise_id" }
        ]
    }]
});

export default Premise;