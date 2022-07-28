const { DataTypes } = require('sequelize');
const db = require('../database/config');
const Movie = require('./movie');

const Genre = db.define('genres', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT },
    img: { type: DataTypes.TEXT },
}, {
    timestamps: false
});

Genre.hasMany(Movie, { as: 'movies', foreignKey: 'id_genre'})
Movie.belongsTo(Genre, { foreignKey: 'id_genre'});

module.exports = Genre;