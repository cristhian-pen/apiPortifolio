const { Sequelize } = require('sequelize');
require('dotenv').config();

//Conexão com o banco de dados
const sequelize = new Sequelize(DB_NAME, DB_KEY, DB_AUTH, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

module.exports = sequelize;