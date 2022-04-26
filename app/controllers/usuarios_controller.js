const { Usuario } = require('../models');

exports.listar = async function(req, res) {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

exports.criar = async function(req, res) {
  res.send("Aqui deve ser implementado")
};

exports.buscar = async function(req, res) {
  res.send("Aqui deve ser implementado" + req.params.id)
};

exports.atualizar = async function(req, res) {
  res.send("Aqui deve ser implementado")
};

exports.deletar = async function(req, res) {
  res.send("Aqui deve ser implementado")
};