const { DataTypes } = require('sequelize');
const db = require('../database/config');
const Movie = require('./movie');

const Genre = db.define('genres', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT },
    image: { type: DataTypes.TEXT },
});

Genre.belongsToMany(Movie, { through: 'genres__movies', timestamps: false })
Movie.belongsToMany(Genre, { through: 'genres__movies', timestamps: false })

module.exports = Genre;