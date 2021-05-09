import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Bill = sequelize.define('bill', {
    bill_id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    due_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    premise_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    }
}, {
    sequelize,
    tableName: 'bills',
    timestamps: false,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
            { name: "bill_id" }
        ]
    }]
});

export default Bill;