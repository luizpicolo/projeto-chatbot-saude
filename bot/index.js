const TelegramBot = require('node-telegram-bot-api');
const latinize = require('latinize');
const ChatBot = require("./model")
const Telegran = require('../config/telegran')
const bot = new TelegramBot(Telegran.token, {polling: true});

//const { Usuario } = require('../app/models');

const chatbot = new ChatBot();

bot.on('message', async (msg, match) => {
  //console.log(await Usuario.findAll());
  console.log("Mensagem" + "\n")
  console.log(JSON.stringify(msg.chat) + "\n\n")

  const chatId = msg.chat.id;
  const resp = await chatbot.loading_done(latinize(msg.text))
  bot.sendMessage(chatId, resp);
});