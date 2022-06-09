const RiveScript = require('rivescript');
const { Paciente, Esf, Informacao, AgendamentoExame, Avaliacao} = require('../../app/models');
const CPF = require('cpf-check');
const moment = require('moment');

moment.locale('pt-br');

const ChatBot = function() {
  var self = this;
  self.rs = new RiveScript({utf8: true});
  self.rs.loadDirectory("/app/bot/brain").then(self.loading_done).catch(self.loading_error);

  self.loading_done = async function(req, id, messager){
    self.rs.sortReplies();
    self.id = id;
    self.messager = `${messager}_id`;
    return await self.rs.reply(self.id, req, self);
  }

  self.loading_error = function(error){
    console.log("Error when loading files: " + error);
  }

  self.mostrarDataExamePaciente = async function() {
    try {
      let paciente = await self.verificarCadastroPaciente();
      let paciente_ = await Paciente.findByPk(paciente.id, {include: ['agendamentos']});
      let data = paciente_.agendamentos[0].data_agendamento;
      if (data){
        return self.formatarData(data)
      } else {
        return "Ainda não há data agendada" 
      }   
    } catch (error) {
      return "Ainda não há data agendada"  
    }
  };

  self.verificarCadastroPaciente = async () => {
    try {
      let paciente = await Paciente.findOne({ where: { [self.messager]: self.id.toString() } });
      return paciente ? paciente : null    
    } catch (error) {
      return null 
    }
  };

  self.salvarCadastroPaciente = async (args) => {
    let paciente = {
      "nome": args[0],
      "contato": args[3],
      "cpf": args[1],
      "esfId": args[2]
    }
    paciente[self.messager] = self.id.toString();
    
    try {
      return await Paciente.create(paciente)
    } catch (error) {
      return false 
    }
  }

  self.buscarEsf = async (id) => {
    let esf = await Esf.findByPk(id)
    return esf ? esf.nome : null    
  }

  self.listarEsfs = async () => {
    let string_esfs = "";
    let esfs = await Esf.findAll();
    esfs.forEach(esf => {
      string_esfs += `${esf.id} - ${esf.nome}\n`  
    });
    return string_esfs
  }

  self.removeTags = (str) => {
      if ((str === null) || (str === ''))
          return false;
      else
          str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
  }

  self.buscarInformacao = async (id) => {
   let informacao = await Informacao.findByPk(id)   
   let resul = self.removeTags(informacao.conteudo);
   return informacao ? resul: null
  }

  self.listarInformacoes = async () => {
    let string_info = "";
    let info = await Informacao.findAll();
    info.forEach(info => {
      string_info += `${info.id} - ${info.tipo}\n`  
    });
    return string_info
  }

  self.salvarAgendamentoPrevio = async (args) => { 
    let paciente = await self.verificarCadastroPaciente()
    
    let agendamento = {
      "pacienteId": paciente.id,
      "dia_previsto": args[0],
      "horario_previsto": args[1]
    }

    try {
      return await AgendamentoExame.create(agendamento)
    } catch (error) {
      return false 
    }
  }

  self.salvarAvaliacao = async (args) => {
    let paciente = await self.verificarCadastroPaciente()
    let avaliacao = {
      "pacienteId": paciente.id,
      "nota": args[0],
    }

    try {
      return await Avaliacao.create(avaliacao)
    } catch (error) {
      return false 
    }
  }

  self.formatarData = (data) => {
    return moment(data).format('LLLL');
  }

  self.checarCPF = function(cpf){
    return CPF.validate(cpf)  
  }
}

module.exports = ChatBot