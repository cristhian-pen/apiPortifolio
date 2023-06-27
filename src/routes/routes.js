const express = require('express');
const router = express.Router();
const { authenticate, createCentral,
    createUsuario,
    atualizaProjeto,
    infoCentral, infoUsuario,
    infoProjetos, atualizaSenha,
    projetos, atualizaUsuario,
    deletaUsuario, deletaProjetos, atualizaCentral, criaProjetos } = require('../../App/Controller/controller');

const uploadUser = require('../../App/Controller/ImgInput/uploadImage');
const uploadArray = require('../../App/Controller/ImgInput/uploadArray');


router.get('/', (req, res) => {
    res.send('It Works!');
})

router.post('/login', authenticate);

router.get('/api/projetos/:nomeProjeto', infoProjetos);
router.get('/api/projetos', projetos);
router.put('/api/projetos/atualizar', atualizaProjeto);

router.post('/api/projetos/criar', uploadArray.single('imgProjeto'), criaProjetos);
router.delete('/api/projetos/deleta/:nomeProjeto', deletaProjetos);

router.get('/api/usuarios/:email', infoUsuario);
router.put('/api/usuarios/atualizar', atualizaUsuario);
router.put('/api/usuarios/atualizar/senha', atualizaSenha);
router.post('/api/usuarios/criar', createUsuario);
router.delete('/api/usuarios/deletar/:emailUsuario', deletaUsuario);

router.get('/api/central', infoCentral);
router.post('/api/central/criar', uploadUser.single('img'), createCentral);
router.put('/api/central/atualizar', uploadUser.single('imgUsuario'), atualizaCentral);


module.exports = router;