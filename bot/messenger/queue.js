const { Queue }  = require("node-resque");
const Ngrok = require('ngrok');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const Secrets = require('../../config/secrets.js');
const Config = require('../../config/database.js');

const port = 3001;
const app = express();
const bot = new TelegramBot(Secrets.telegran.token);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const queue = new Queue({ connection: Config.redis }, 'jobs');

(async function() {
  let url = '';
  if (Secrets.webhooks.url == ''){
    url = await Ngrok.connect(port);
    console.log('----------------------');
    console.log(`- URL: ${url}`)
    console.log('----------------------');
  } else {
    url = Secrets.webhooks.url
  }
  bot.setWebHook(`${url}/message`);
})();

app.get('/', async (req, res) => {
  res.sendStatus(200)
})

app.post('/message', async (req, res) => {
  await queue.connect();
  await queue.enqueue("messagesQueue", "add", req.body);
  await queue.end();
  res.status(200).send("");
});

app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});