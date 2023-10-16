const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_KEY = process.env.DB_KEY;
const DB_AUTH = process.env.DB_AUTH;
const DB_HOST = process.env.DB_HOST;

//require('dotenv').config();

//Conexão com o banco de dados
const sequelize = new Sequelize(DB_NAME, DB_KEY, DB_AUTH, {
    host: DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2')
});

module.exports = sequelize;
