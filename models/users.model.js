import Sequelize from "sequelize";
import { sequelize } from "../db/dbConnect.js";

const User = sequelize.define('users', {
    user_id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(256),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(256),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [{
        name: "PRIMARY",
        unique: true,
        fields: [
            { name: "user_id" }
        ]
    }]
});

export default User;