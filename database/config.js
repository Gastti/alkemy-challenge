const { Sequelize } = require('sequelize');

const db = new Sequelize('disney-database', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

// const db = new Sequelize('u178075539_disneydb', 'u178075539_gastti', '123456Gg', {
//     host: 'sql717.main-hosting.eu',
//     dialect: 'mysql',
//     port: '3306'
// });

module.exports = db;