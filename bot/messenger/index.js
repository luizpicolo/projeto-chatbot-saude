const { Queue, Worker }  = require("node-resque");
const ngrok = require('ngrok');
const TelegramBot = require('node-telegram-bot-api');
const latinize = require('latinize');
const ChatBot = require("../models");
const express = require('express');
const telegran = require('../../config/tokens');
const whatsapp = require('../../config/tokens');

const port = 3001;
const app = express();
const client = require('twilio')(whatsapp.accountSid, whatsapp.authToken); 
const bot = new TelegramBot(telegran.token);
const chatbot = new ChatBot();
const connectionDetails = {
  pkg: "ioredis",
  host: "redis",
  port: 6379,
  database: 0,
  options: {password: 'redis'},
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const jobs = {
  add: async(msg) => {
    console.log(msg);
    if (msg.message){
      const chatId = msg.message.chat.id;
      const resp = await chatbot.loading_done(latinize(msg.message.text), chatId, 'telegran')
      bot.sendMessage(chatId, resp);
    } else {
      client.messages
        .create({
          from: 'whatsapp:+14155238886',
          body: await chatbot.loading_done(latinize(msg['Body']), msg['WaId'], 'whatsapp'),
          to: `whatsapp:${msg['WaId']}`
        })
        .then(message => console.log(message.sid));
    }
  }
}

const worker = new Worker({connection: connectionDetails, queues: ["messageQueue"]}, jobs);
const queue = new Queue({ connection: connectionDetails }, jobs);

(async function() {
  const url = await ngrok.connect(port);
  console.log(url)
  bot.setWebHook(`${url}/message`);
  await worker.connect();
  worker.start();
})();

app.post('/message', async (req, res, next) => {
  await queue.connect();
  await queue.enqueue("messageQueue", "add", req.body);
  await queue.end();
});

app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

exports.start = app