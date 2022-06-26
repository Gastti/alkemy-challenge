const { DataTypes } = require('sequelize');
const db = require('../database/config');

const Movie = db.define('movies', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.TEXT, defaultValue: 'non-image.png' },
    title: { type: DataTypes.TEXT, },
    score: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 }, defaultValue: 1 },
}, {
    updatedAt: false
});

module.exports = Movie;