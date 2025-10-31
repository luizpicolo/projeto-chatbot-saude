const TelegramBot = require('node-telegram-bot-api');
const Secrets = require('../../config/secrets.js')
const bot = new TelegramBot(Secrets.telegran.token, {polling: false});
//const client = require('twilio')(Secrets.whatsapp.accountSid, Secrets.whatsapp.authToken);
const moment = require('moment');
const Promise = require('bluebird');

// gRPC
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { fileURLToPath } = require('url');

const PROTO_PATH = path.join(__dirname, '../../proto', 'whatsapp.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const whatsappProto = grpc.loadPackageDefinition(packageDefinition).whatsapp;

const client = new whatsappProto.WhatsAppService('host.docker.internal:50051', grpc.credentials.createInsecure()
);

moment.locale('pt-br');

module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'agendamentos';
    const model_name = 'Agendamento';
  
    const Agendamento = sequelize.define(table_name, {      
      data_agendamento: {
        type: DataTypes.DATE,
      },
      horario_previsto:{
        type: DataTypes.STRING,
      },
      dia_previsto:{
        type: DataTypes.STRING,
      },
      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      hooks: {
        beforeUpdate : async (record, options) => {
          const paciente = await sequelize.models.pacientes.findByPk(record.pacienteId);

          const MSG = `Olá, ${paciente.name}, espero lhe encontrar muito bem.\n\nTenho novidades sobre o seu exame, ele foi agendado para ${moment(record.data_agendamento).format('LLL')} em sua ESF.\n\nCaso tenha problema com a data, posso fazer um novo agendamento para você, é só me chamar 😉.`;

          function sendMessages(bot, chatId, messages) {
              return Promise.mapSeries(messages, function(message) {
                  return bot.sendMessage(chatId, message);
              });
          }
          
          if (record.status){
            if (paciente.telegran_id){
              sendMessages(bot, paciente.telegran_id, MSG.split("\n\n"))
              .then(() => {
                  console.log("All messages sent, in series!");
              });
            }
            
            if (paciente.whatsapp_id){
              const clientID = paciente.whatsapp_id.replace('@c.us', '')
              setTimeout(() => {
                sendMessage(clientID, MSG);
              }, 3000);
            }

            record.status = false;
          }
        }
      }
    });
  
    Agendamento.associate = function(models) {
      Agendamento.belongsTo(models.Paciente, { as: 'paciente' });
    };
    
    Agendamento.model_name = function () {
      return model_name
    };
    
    return Agendamento;
  }

// Função para enviar mensagem
const sendMessage = (to, message) => {
  client.SendMessage({ to, message }, (err, response) => {
    if (err) {
      console.error('Erro ao enviar mensagem:', err.message);
    } else {
      console.log('💬 Resposta:', response);
    }
  });
}
