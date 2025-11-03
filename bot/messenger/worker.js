const { Worker }  = require("node-resque");
const TelegramBot = require('node-telegram-bot-api');
const latinize = require('latinize');
const ChatBot = require("../models");
const Secrets = require('../../config/secrets');
const Config = require('../../config/database.js');

const bot = new TelegramBot(Secrets.telegran.token);
const chatbot = new ChatBot();

// gRPC
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../../proto', 'whatsapp.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const whatsappProto = grpc.loadPackageDefinition(packageDefinition).whatsapp;

const server = new whatsappProto.WhatsAppService('host.docker.internal:50051', grpc.credentials.createInsecure()
);

const jobs = {
  add: async(msg) => {
    console.log("Start Worker")
    if (msg.message){
      console.log("Send Telegran Message")
      const chatId = msg.message.chat.id;
      const resp = await chatbot.loading_done(latinize(msg.message.text), chatId, 'telegran')
      bot.sendMessage(chatId, resp);
    } else {
      console.log("Send WhatsApp Message")
      // client.messages
      //   .create({
      //     from: Secrets.whatsapp.from,
      //     body: await chatbot.loading_done(latinize(msg['Body']), msg['WaId'], 'whatsapp'),
      //     to: `whatsapp:${msg['WaId']}`
      //   })
      //   .then(
      //     message => console.log(message.sid)
      //   );
    }
    console.log("Finish Worker")
  }
}

function subscribeToMessages() {
  console.log("🔔 Inscrevendo-se para receber mensagens...")

  const call = server.SubscribeToMessages({})

  call.on("data", (message) => {
    console.log("\n📩 Nova mensagem recebida:")
    console.log(`   De: ${message.from}`)
    console.log(`   Mensagem: ${message.message}`)
    console.log(`   Timestamp: ${message.timestamp}`)
    console.log(`   ID: ${message.messageId}`)

    processIncomingMessage(message)
  })

  call.on("end", () => {
    console.log("❌ Stream encerrado pelo servidor")
  })

  call.on("error", (err) => {
    console.error("❌ Erro no stream:", err.message)
  })
}

async function processIncomingMessage(message) {
  const lowerMessage = message.message.toLowerCase()
  let response = await chatbot.loading_done(latinize(lowerMessage), message.from, 'whatsapp');
  sendMessage(message.from, response);
}

function sendMessage(to, message) {
  server.SendMessage({ to, message }, (err, response) => {
    if (err) {
      console.error("Erro ao enviar mensagem:", err.message)
    } else {
      console.log("💬 Resposta:", response)
    }
  })
}

subscribeToMessages()

const worker = new Worker({connection: Config.redis, queues: ["messagesQueue"]}, jobs);

(async function() {
  await worker.connect();
  worker.start();
})();