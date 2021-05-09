import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const Member = sequelize.define('member', {
    member_id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    phone: {
        type: Sequelize.NUMBER,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'members',
    timestamps: false,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        fields: [
            { name: "member_id" }
        ]
    }]
});

export default Member;