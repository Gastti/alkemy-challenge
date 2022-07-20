const { DataTypes } = require('sequelize');
const db = require('../database/config');

const Movie = db.define('movies', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING },
    title: { type: DataTypes.TEXT },
    score: { type: DataTypes.INTEGER },
    id_genre: { type: DataTypes.INTEGER }
}, {
    updatedAt: false
});


module.exports = Movie;