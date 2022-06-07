const TelegramBot = require('node-telegram-bot-api');
const latinize = require('latinize');
const ChatBot = require("../models")
const telegran = require('../../config/tokens')
const schedule = require('node-schedule');
const { AgendamentoExame, Paciente } = require('../../app/models');
const moment = require('moment');
const bot = new TelegramBot(telegran.token, {polling: true});

moment.locale('pt-br');

const chatbot = new ChatBot();

exports.start = bot.on('message', async (msg, match) => {
  console.log("Mensagem" + "\n")
  console.log(JSON.stringify(msg.chat) + "\n\n")

  const chatId = msg.chat.id;
  const resp = await chatbot.loading_done(latinize(msg.text), chatId, 'telegran')
  bot.sendMessage(chatId, resp);

});

exports.sendMessage = async () => {
    const um_dia_atras = new Date(new Date().setDate(new Date().getDate() - 1));
    var paciente = await Paciente.findAll(
      {
        where: {
          my_date: {
            $gt: um_dia_atras,
            $lt: AgendamentoExame.data_agendamento,
          },
        },
      });

      bot.sendMessage(chatid, "Olá, seu exame está chegando perto, ele está marcado "+ data_formatada);
     
}