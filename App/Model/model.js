const db = require('../Config/db');
const { DataTypes } = require('sequelize');

//Criação de tabelas
const usuario = db.define('USUARIO', {
    CD_USUARIO: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    NOME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SOBRENOME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EMAIL: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    PASSWORD: {
        type: DataTypes.CHAR,
        allowNull: false
    }
});

const centralData = db.define('DADOS_CENTRAL', {
    TITULO_CENTRAL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SUBTITULO_CENTRAL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SOBRE_CENTRAL: {
        type: DataTypes.STRING(1234),
        allowNull: true
    },
    IMG_CENTRAL: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const projectsData = db.define('PROJETO', {

    CD_PROJETO: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    TITULO_PROJETO: {
        type: DataTypes.STRING,
        allowNull: true
    },
    DS_PROJETO: {
        type: DataTypes.STRING(1234),
        allowNull: true
    },
    REP_PROJETO: {
        type: DataTypes.STRING,
        unique: true,
    },
    IMG_PROJETO: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

//Criação e sincronização de conteudo das tabelas
usuario.sync();
centralData.sync();
projectsData.sync();
console.log('Todas as tabelas criadas e ou sincronizadas');

module.exports = {
    usuario,
    projectsData,
    centralData
};