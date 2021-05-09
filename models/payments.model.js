import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Payment = sequelize.define('payment', {
    payment_id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    amount_paid: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    premise_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bill_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date_paid: {
        type: Sequelize.DATE,
        allowNull: false,
        // default: default dat - current time
    }
}, {
    sequelize,
    tableName: 'payments',
    timestamps: false,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        fields: [
            { name: "payment_id" }
        ]
    }]
});

export default Payment;