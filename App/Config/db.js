const { Sequelize } = require('sequelize');
require('dotenv').config();

//Conexão com o banco de dados
const sequelize = new Sequelize('DB_NAME', 'DB_KEY', 'DB_AUTH', {
    host: 'srvportifoliodb.mysql.database.azure.com',
    dialect: 'mysql',
    dialectModule: require('mysql2')
});

module.exports = sequelize;
