const { DataTypes } = require('sequelize');
const db = require('../database/config');

const User = db.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true },
    nickname: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.TEXT, allowNull: false, },
    password: { type: DataTypes.TEXT, allowNull: false },
    state: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    timestamps: false
})

module.exports = User;