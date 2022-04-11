var express = require('express');
var router = express.Router();
const { Usuario } = require('../app/models');

//Listar todos
router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
}); 

router.post('/', (req, res) => {}); // Criar
router.get('/:id', (req, res) => {}); //Buscar
router.put('/:id', (req, res) => {}); //Editar
router.delete('/:id', (req, res) => {}); //Deletar

module.exports = router;
