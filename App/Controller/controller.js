//Utilizar variaveis globais
require('dotenv').config();
//Encriptador
const bcrypt = require('bcrypt');
//transformar em jwt
const jwt = require('jsonwebtoken');

const { usuario, centralData, projectsData } = require('../Model/model');

//=====================CRIAR USUARIO==========================

async function createUsuario(req, res) {

    const { nomeUsuario, sobrenomeUsuario,
        emailUsuario, password } = req.body;

    //Faz o hash da senha com 12
    const password_hash = await bcrypt.hash(password, 12);

    usuario.create({
        NOME: nomeUsuario,
        SOBRENOME: sobrenomeUsuario,
        EMAIL: emailUsuario,
        PASSWORD: password_hash
    })
    try {
        res.status(200).send('Usuario criado');
    } catch (error) {
        res.sendStatus(500);
    }
}

//===================CRIAR CENTRAL===============================

async function createCentral(req, res) {

    const { tituloCentral, subCentral,
        sobre } = req.body;

    await centralData.create({
        TITULO_CENTRAL: tituloCentral,
        SUBTITULO_CENTRAL: subCentral,
        SOBRE_CENTRAL: sobre,
        IMG_CENTRAL: req.file.filename
    })
    try {
        res.status(200).send('Pagina central criada');
    } catch (error) {
        res.sendStatus(500);
    }
}
//========================== ATUALIZAR CENTRAL ==============================
async function atualizaCentral(req, res) {

    const { tituloCentral, subCentral,
        sobre } = req.body;

    console.log(req.file.filename)

    //Atualiza as informações a partir do id informado
    await centralData.update({
        TITULO_CENTRAL: tituloCentral,
        SUBTITULO_CENTRAL: subCentral,
        SOBRE_CENTRAL: sobre,
        IMG_CENTRAL: req.file.filename
    },
        {
            where: {
                id: 1
            }
        }
    )
    try {
        res.status(200).send('Dados atualizados');
    } catch (error) {
        res.sendStatus(error);
    }
}

//================== CRIAR PROJETOS ============================
async function criaProjetos(req, res) {

    const { tituloProjeto,
        sobreProjeto, repoProjeto } = req.body;

    await projectsData.create({
        TITULO_PROJETO: tituloProjeto,
        DS_PROJETO: sobreProjeto,
        REP_PROJETO: repoProjeto,
        IMG_PROJETO: req.file.filename
    })
    try {
        res.status(200).send('Pagina de projetos criada');
    } catch (error) {
        res.sendStatus(500);
    }
}
//===================== ATUALIZAR PROJETOS =======================
function atualizaProjeto(req, res) {

    const { tituloProjeto,
        sobreProjeto, repoProjeto,
        imgProjeto, idProjeto } = req.body;

    //Atualiza a partido do id do projeto
    projectsData.update({
        TITULO_PROJETO: tituloProjeto,
        DS_PROJETO: sobreProjeto,
        REP_PROJETO: repoProjeto,
        IMG_PROJETO: imgProjeto
    },
        {
            where: {
                CD_PROJETO: idProjeto
            }
        }
    );

    try {
        res.status(200).send('Projetos atualizados e adicionados a lista')
    } catch (error) {
        res.sendStatus(500);
    }
}
//====================== AUTENTICADOR ============================
async function authenticate(req, res) {

    const { email, senha } = req.body;

    let cursor = await usuario.findOne({
        attributes: ['CD_USUARIO', 'EMAIL', 'PASSWORD'],
        where: {
            EMAIL: email,
        }
    })

    //Faz a comparação da senha do front com o banco
    const isValid = await bcrypt.compareSync(senha, cursor.PASSWORD, (res, err) => { console.log("Senha valida" + res); });

    //Validações
    if (!isValid) {
        //Caso não seja valido, retorna o erro
        return res.json({ error: "true", message: "password and user does not match " })
    } else if (isValid) {

        //Caso seja valido, retorna o token jwt 
        const id = cursor.CD_USUARIO;
        const token = jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: 300 });
        return res.json({ auth: true, token: token });

    } else {
        res.status(404).send('Not Found');
    }
}
// =============================== ATUALIZAR SENHA ==================================
async function atualizaSenha(req, res) {
    const { senha, email } = req.body;


    console.log(senha, email)

    await usuario.update({ PASSWORD: senha }, { where: { EMAIL: email } })
    try {
        res.status(200).send("Senha alterada")
    } catch (error) {
        console.log(error);
    }

}
//===============================ATUALIZA USUARIOS==============================

async function atualizaUsuario(req, res) {
    const { senha, nome, sobrenome, email, idUsuario } = req.body;

    await usuario.update({
        PASWORD: senha,
        NOME: nome,
        SOBRENOME: sobrenome,
        EMAIL: email
    }, {
        where: {
            CD_USUARIO: idUsuario
        }
    })

    try {
        res.status(200).send('Usuario atualizado')
    } catch (error) {
        res.sendStatus(500);
    }
}

//============================ CONSULTA CENTRAL ============================ -

async function infoCentral(req, res) {

    const informações = await centralData.findAll({
        attributes: ['TITULO_CENTRAL', 'SUBTITULO_CENTRAL', 'SOBRE_CENTRAL', 'IMG_CENTRAL']
    })
    try {
        res.json({
            erro: false,
            informações,
            url: 'http://192.168.0.13:3002/files/'
        });
    } catch (error) {
        res.sendStatus(404).json({ message: 'nada encontrado' });
    }

}

//================================== INFORMACOES DO PROJETO CONSULTA ===================================================

async function infoProjetos(req, res) {

    const { nomeProjeto } = req.params;

    //Consulta a partir do nome do projeto
    const informacoes = await projectsData.findAll({
        attributes: ['CD_PROJETO', 'TITULO_PROJETO', 'DS_PROJETO', 'REP_PROJETO', 'IMG_PROJETO'],
        where: {
            TITULO_PROJETO: nomeProjeto
        }
    })
    try {
        res.json({
            erro: false,
            informacoes,
            url: 'http://192.168.0.13:3002/files/projects/'
        });
    } catch (error) {
        res.sendStatus(404).json({ message: 'nada encontrado' });
    }
}
//==================================== INFORMAÇÕES DO PROJETO  =======================================================

async function projetos(req, res) {

    const informacoes = await projectsData.findAll({
        attributes: ['TITULO_PROJETO', 'DS_PROJETO', 'REP_PROJETO', 'IMG_PROJETO'],
    })
    try {
        res.json({
            erro: false,
            informacoes,
            url: 'http://192.168.0.13:3002/files/projects/'
        });
    } catch (error) {
        res.sendStatus(404).json({ message: 'nada encontrado' });
    }

}

//============================= CONSULTA USUARIO ============================

async function infoUsuario(req, res) {

    const { email } = req.params;

    //Consulta atraves do email do usuario
    const informações = await usuario.findAll({
        attributes: ['CD_USUARIO', 'NOME', 'SOBRENOME', 'EMAIL'],
        where:
        {
            EMAIL: email
        }

    });
    try {
        res.json(informações);
    } catch (error) {
        res.sendStatus(404).json({ message: 'nada encontrado' });
    }

}

//=================================DELETA USUARIO==========================
async function deletaUsuario(req, res) {

    const { emailUsuario } = req.params;

    //Deleta a partir do email
    await usuario.destroy({
        where:
        {
            EMAIL: emailUsuario
        }
    });
    try {
        res.json({ message: "Success" });
    } catch (error) {
        res.sendStatus(404).json({ message: 'Usuario deletado com sucesso' });
    }

}

//==================================DELETA PROJETOS===================================
async function deletaProjetos(req, res) {

    const { nomeProjeto } = req.params;

    //deleta a partir do nome do projeto
    await projectsData.destroy({
        where:
        {
            TITULO_PROJETO: nomeProjeto
        }
    });
    try {
        res.json({ message: "Success" });
    } catch (error) {
        res.sendStatus(404).json({ message: 'Projeto deletado com sucesso' });
    }

}

module.exports = {
    createUsuario,
    createCentral,
    atualizaCentral,
    authenticate,
    atualizaProjeto,
    criaProjetos,
    infoCentral,
    infoUsuario,
    infoProjetos,
    atualizaSenha,
    projetos,
    atualizaUsuario,
    deletaUsuario,
    deletaProjetos
}