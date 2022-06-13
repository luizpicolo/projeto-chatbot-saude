const TelegramBot = require('node-telegram-bot-api');
const telegran = require('../../config/tokens')
const bot = new TelegramBot(telegran.token, {polling: false});
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
          bot.sendMessage(paciente.telegran_id, `Olá, tenho novidades sobre o seu exame, ele foi agendado para ${moment(record.data_agendamento).format('LLL')}`); 
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
