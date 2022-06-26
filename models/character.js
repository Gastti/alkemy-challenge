const { DataTypes } = require('sequelize');
const db = require('../database/config');
const Movie = require('../models/movie')

const Character = db.define('characters', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    image: { type: DataTypes.TEXT, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.INTEGER, allowNull: false },
    story: { type: DataTypes.TEXT, allowNull: false }
}, {
    timestamps: false
})

Character.belongsToMany(Movie, { through: 'characters__movies', timestamps: false })
Movie.belongsToMany(Character, { through: 'characters__movies', timestamps: false })

module.exports = Character;