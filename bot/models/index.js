const RiveScript = require('rivescript');
const { Paciente, Esf } = require('../../app/models');
const CPF = require('cpf-check');

const ChatBot = function() {
  var self = this;
  self.rs = new RiveScript({utf8: true});
  self.rs.loadDirectory("/app/bot/brain").then(self.loading_done).catch(self.loading_error);

  self.loading_done = async function(req, id, messager){
    self.rs.sortReplies();
    self.id = id;
    self.messager = `${messager}_id`;
    return await self.rs.reply('nome', req, self);
  }

  self.loading_error = function(error){
    console.log("Error when loading files: " + error);
  }

  self.getDataExamePaciente = function() {
      return "20/12/2022"
  };

  self.verificarCadastro = async function() {
    let paciente = await Paciente.findOne({ where: { [self.messager]: self.id.toString() } });
    return paciente ? paciente : null    
  };

  self.salvarCadastro = async function(data){
    console.log(data)
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

  self.checarCPF = async function(cpf){
    return CPF.validate(cpf)  
  }
}

module.exports = ChatBot