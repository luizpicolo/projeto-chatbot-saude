const TelegramBot = require('node-telegram-bot-api');
const Secrets = require('../../config/secrets.js')
const bot = new TelegramBot(Secrets.telegran.token, {polling: false});
const client = require('twilio')(Secrets.whatsapp.accountSid, Secrets.whatsapp.authToken);
const moment = require('moment');
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

          const msg = `Olá, ${paciente.name}, espero lhe encontrar muito bem.\n\nTenho novidades sobre o seu exame, ele foi agendado para ${moment(record.data_agendamento).format('LLL')} em sua ESF.\n\nCaso tenha problema com a data, posso fazer um novo agendamento para você, é só me chamar 😉.`;
          
          if (record.status){
            if (paciente.telegran_id){
              bot.sendMessage(paciente.telegran_id, msg);
            }
            
            if (paciente.whatsapp_id){
              client.messages.create({from: Secrets.whatsapp.from, body: msg, to: `whatsapp:${paciente.whatsapp_id}`})
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
