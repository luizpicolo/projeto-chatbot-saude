var express = require('express');
var router = express.Router();
var UsuariosController = require('../app/controllers/usuarios_controller');

router.get('/', UsuariosController.listar); 
router.post('/criar', UsuariosController.criar); 
router.get('/buscar/:id', UsuariosController.buscar); 
router.put('/atualizar/:id', UsuariosController.atualizar); 
router.delete('/deletar/:id', UsuariosController.deletar); 

module.exports = router;
