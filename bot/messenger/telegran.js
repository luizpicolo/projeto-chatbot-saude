const TelegramBot = require('node-telegram-bot-api');
const latinize = require('latinize');
const ChatBot = require("../models")
const telegran = require('../../config/tokens')
const schedule = require('node-schedule');
const bot = new TelegramBot(telegran.token, {polling: true});

const chatbot = new ChatBot();

exports.start = bot.on('message', async (msg, match) => {
  console.log("Mensagem" + "\n")
  console.log(JSON.stringify(msg.chat) + "\n\n")

  const chatId = msg.chat.id;
  const resp = await chatbot.loading_done(latinize(msg.text), chatId, 'telegran')
  bot.sendMessage(chatId, resp);

  // Mensagem automatica: Telegram
  let timer = null;

  bot.onText(/\/start/, chatId=> {
      timer = setInterval(() => {
          if(new Date().getSeconds() === 1) {
              bot.sendMessage(chatId, "Ola, seu exame está chegando perto: ......");    
          }
      }, 1000)    
  });
  
  bot.onText(/\/stop/, chatId => {
      clearInterval(timer);
  })
});