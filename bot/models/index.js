const RiveScript = require('rivescript');
const { Paciente } = require('../../app/models');
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

  self.getDataExame = function() {
      return "20/12/2022"
  };

  self.verificarCadastro = async function() {
    let paciente = await Paciente.findOne({ where: { [self.messager]: self.id.toString() } });
    return paciente ? paciente : null    
  };

  self.salvarCadastro = async function(data){
    console.log(data)
  }

  self.getEsfs = async function(){
    return ['esf1', 'esf2', 'wsf3']   
  }

  self.checarCPF = async function(cpf){
    return CPF.validate(cpf)  
  }
}

module.exports = ChatBot