const RiveScript = require('rivescript');
const { Paciente, Esf, Informacao, AgendamentoExame} = require('../../app/models');
const CPF = require('cpf-check');

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

  self.getDataExamePaciente = function() {
      return "20/12/2022"
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
      "esf_id": args[2]
    }
    paciente[self.messager] = self.id.toString();
    
    try {
      return await Paciente.create(paciente)
    } catch (error) {
      return false 
    }
  }

  self.buscarEsf = async (id) => {
    let paciente = await Esf.findByPk(id)
    return paciente ? paciente.nome : null    
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
    let agendamento = {
      "data_agendamento": null,
      "dia_previsto": args[0],
      "horario_previsto": args[1],
      "status": false,
    }
      return await AgendamentoExame.create(agendamento)
  }

  self.checarCPF = async function(cpf){
    return CPF.validate(cpf)  
  }
}

module.exports = ChatBot