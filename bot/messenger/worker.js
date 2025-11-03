const { Worker, Queue }  = require("node-resque");
const TelegramBot = require('node-telegram-bot-api');
const latinize = require('latinize');
const ChatBot = require("../models");
const Secrets = require('../../config/secrets');
const Config = require('../../config/database.js');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const bot = new TelegramBot(Secrets.telegran.token, { polling: true });
const chatbot = new ChatBot();

const PROTO_PATH = path.join(__dirname, '../../proto', 'whatsapp.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const whatsappProto = grpc.loadPackageDefinition(packageDefinition).whatsapp;

const server = new whatsappProto.WhatsAppService(
  'host.docker.internal:50051',
  grpc.credentials.createInsecure()
);

const sendMessage = (to, message) => {
  server.SendMessage({ to, message }, (err, response) => {
    if (err) {
      console.error("Erro ao enviar mensagem:", err.message);
    } else {
      console.log("Mensagem enviada:", response);
    }
  });
}

const processIncomingMessage = async (msg) => {
  if (msg.channel === 'telegram') {
    console.log("Processando mensagem do Telegram...");
    const text = latinize(msg.text.toLowerCase());
    const resp = await chatbot.loading_done(text, msg.chatId, 'telegran');
    await bot.sendMessage(msg.chatId, resp);
    console.log("Mensagem enviada ao Telegram");
  } 
  else if (msg.channel === 'whatsapp') {
    console.log("Processando mensagem do WhatsApp...");
    const text = latinize(msg.message.toLowerCase());
    const resp = await chatbot.loading_done(text, msg.from, 'whatsapp');
    sendMessage(msg.from, resp);
    console.log("Mensagem enviada ao WhatsApp");
  } 
  else {
    console.warn("Canal desconhecido:", msg);
  }
}

const jobs = {
  processIncomingMessage: async (msg) => {
    await processIncomingMessage(msg);
  }
};

const worker = new Worker(
  { connection: Config.redis, queues: ["messagesQueue"] }, jobs
);

const subscribeToMessages = async () => {
  console.log("Inscrevendo-se para receber mensagens via WhatsApp...");
  const queue = new Queue({ connection: Config.redis }, {});
  await queue.connect();

  const call = server.SubscribeToMessages({});

  call.on("data", async (message) => {
    console.log("\nNova mensagem do WhatsApp:");
    console.log(`De: ${message.from}`);
    console.log(`Mensagem: ${message.message}`);
    await queue.enqueue("messagesQueue", "processIncomingMessage", [{
      channel: 'whatsapp',
      from: message.from,
      message: message.message
    }]);
    console.log("Mensagem WhatsApp adicionada à fila Redis");
  });

  call.on("end", () => {
    console.log("Stream WhatsApp encerrado");
  });

  call.on("error", (err) => {
    console.error("Erro no stream WhatsApp:", err.message);
  });
}

const subscribeToTelegram = async () => {
  console.log("Inscrevendo-se para receber mensagens via Telegram...");
  const queue = new Queue({ connection: Config.redis }, {});
  await queue.connect();

  bot.on('message', async (message) => {
    console.log("\nNova mensagem do Telegram:");
    console.log(`De: ${message.chat.id}`);
    console.log(`Mensagem: ${message.text}`);
    await queue.enqueue("messagesQueue", "processIncomingMessage", [{
      channel: 'telegram',
      chatId: message.chat.id,
      text: message.text
    }]);
    console.log("Mensagem Telegram adicionada à fila Redis");
  });
}

(async function() {
  await worker.connect();
  worker.start();
  subscribeToMessages();
  subscribeToTelegram();
})();
