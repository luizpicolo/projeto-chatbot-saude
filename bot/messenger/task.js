const TelegramBot = require('node-telegram-bot-api');
const Secrets = require('../../config/secrets.js')
const schedule = require('node-schedule');
const { Agendamento, Paciente, Esf } = require('../../app/models');
const moment = require('moment');
const { Op } = require('sequelize');
const bot = new TelegramBot(Secrets.telegran.token, {polling: false});
moment.locale('pt-br');

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

// Todos os minutos   - */1 * * * *
// A cada 8 horas     - 0 8/8 * * *
schedule.scheduleJob('*/1 * * * *', async () => {
  const data_final = moment(new Date()).add(2, 'd').format('YYYY/MM/DD');
  const data_inicial = moment(new Date()).format('YYYY/MM/DD');

  var agendamentos = await Agendamento.findAll({
    include: [
        { model: Paciente, as: 'paciente', 
            include: {
                model: Esf, as: 'esf'  
            } 
        }
    ],
    where: {
      data_agendamento: {
        [Op.between] : [data_inicial, data_final]
      },
    },
  });

  agendamentos.forEach(agenda => {
    let paciente = agenda.paciente
    const msg = `Olá, ${paciente.name}, seu exame está chegando perto, ele está agendado para ${moment(agenda.data_agendamento).format('LLL')} na ${paciente.esf.name}. \n\n Aguardamos sua presença 😘`; 

    if (paciente.telegran_id){
      bot.sendMessage(paciente.telegran_id, msg);
    }
    
    if (paciente.whatsapp_id){
      const clientID = paciente.whatsapp_id.replace('@c.us', '')
      sendMessage(clientID, msg);
    }
  });
});

// Função para enviar mensagem
const sendMessage = (to, message) => {
  server.SendMessage({ to, message }, (err, response) => {
    if (err) {
      console.error('Erro ao enviar mensagem:', err.message);
    } else {
      console.log('💬 Resposta:', response);
    }
  });
}