const { Worker }  = require("node-resque");
const TelegramBot = require('node-telegram-bot-api');
const latinize = require('latinize');
const ChatBot = require("../models");
const Secrets = require('../../config/secrets');
const Config = require('../../config/database.js');

const client = require('twilio')(Secrets.whatsapp.accountSid, Secrets.whatsapp.authToken); 
const bot = new TelegramBot(Secrets.telegran.token);
const chatbot = new ChatBot();

const jobs = {
  add: async(msg) => {
    if (msg.message){
      const chatId = msg.message.chat.id;
      const resp = await chatbot.loading_done(latinize(msg.message.text), chatId, 'telegran')
      bot.sendMessage(chatId, resp);
    } else {
      client.messages
        .create({
          from: Secrets.whatsapp.from,
          body: await chatbot.loading_done(latinize(msg['Body']), msg['WaId'], 'whatsapp'),
          to: `whatsapp:${msg['WaId']}`
        })
        .then(
          message => console.log(message.sid)
        );
    }
  }
}

const worker = new Worker({connection: Config.redis, queues: ["messagesQueue"]}, jobs);

(async function() {
  await worker.connect();
  worker.start();
})();