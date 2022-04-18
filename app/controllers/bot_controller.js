const ChatBot = require("../../bot")
const latinize = require('latinize');

const chatbot = new ChatBot();

exports.mensagem = async function(req, res) {
  res.json(await chatbot.loading_done(
    latinize(req.body['mensagem'])
  ));
};