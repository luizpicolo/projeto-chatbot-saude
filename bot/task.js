const TelegramBot = require('node-telegram-bot-api');
const telegran = require('../config/tokens')
const schedule = require('node-schedule');
const { AgendamentoExame, Paciente } = require('../app/models');
const moment = require('moment');
const { Op } = require('sequelize');
const bot = new TelegramBot(telegran.token, {polling: false});

moment.locale('pt-br');

(async () => {
  const data_final = new moment(new Date()).add(2, 'd').format('L');

  var agendamentos = await AgendamentoExame.findAll({
    include: [
        { model: Paciente, as: 'paciente' }
    ],
    where: {
      data_agendamento: {
        [Op.between] : [new Date(), new Date(data_final)]
      },
    },
  });

  agendamentos.forEach(agenda => {
    let paciente = agenda.paciente
    bot.sendMessage(paciente.telegran_id, `Olá, ${paciente.nome}, seu exame está chegando perto, ele está marcado para ${moment(agenda.data_agendamento).format('LLL')}`); 
  });
})();