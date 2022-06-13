const TelegramBot = require('node-telegram-bot-api');
const telegran = require('../config/tokens')
const schedule = require('node-schedule');
const { Agendamento, Paciente } = require('../app/models');
const moment = require('moment');
const { Op } = require('sequelize');
const bot = new TelegramBot(telegran.token, {polling: false});

moment.locale('pt-br');

schedule.scheduleJob('*/1 * * * *', async () => {
  const data_final = moment(new Date()).add(2, 'd').format('YYYY/MM/DD');
  const data_inicial = moment(new Date()).format('YYYY/MM/DD');

  var agendamentos = await Agendamento.findAll({
    include: [
        { model: Paciente, as: 'paciente' }
    ],
    where: {
      data_agendamento: {
        [Op.between] : [data_inicial, data_final]
      },
    },
  });

  agendamentos.forEach(agenda => {
    let paciente = agenda.paciente
    bot.sendMessage(paciente.telegran_id, `Olá, ${paciente.name}, seu exame está chegando perto, ele está marcado para ${moment(agenda.data_agendamento).format('LLL')}`); 
  });
});