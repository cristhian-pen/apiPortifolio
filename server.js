//Utilizar variaveis globais
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./App/Config/db');
const bodyParser = require('body-parser');
const rotas = require('./src/routes/routes');
const path = require('path');

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
//Aceitar informações em json
app.use(express.json());
app.use(rotas);
app.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

sequelize.authenticate()
try {
    console.log(' Conexão estabelecida com sucesso')
} catch (error) {
    console.log('Impossivel estabelecer conexão', error)
};

app.listen(PORT, () => {
    console.log(`Sistema rodando na porta ${PORT}`);
});