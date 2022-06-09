const {Esf, Usuario, Paciente, Informacao, AgendamentoExame, Avaliacao} = require('../app/models');
const translations = require('./translations');

const resources = [
  { resource: Esf, 
    options: {
      //showProperties: ['id', 'nome', 'cnpj', 'email', 'createdAt', 'updatedAt'],
      listProperties: ['id', 'nome', 'cnpj', 'email', 'createdAt', 'updatedAt']
    }
  },
  { resource: Usuario, 
    options: { 
      listProperties: ['id', 'nome', 'email', 'esfId', 'admin', 'createdAt', 'updatedAt']
    }
  },
  { resource: Paciente, 
    options: { 
      showProperties: ['id', 'nome', 'contato', 'esfId', 'createdAt', 'updatedAt'],
      listProperties: ['id', 'nome', 'contato', 'esfId', 'createdAt', 'updatedAt']
    }
  }, 
  { resource: AgendamentoExame, 
    options: {
      listProperties: ['id', 'pacienteId', 'data_agendamento', 'horario_previsto', 'dia_previsto', 'status', 'createdAt', 'updatedAt']
    }
  },
  { resource: Informacao, 
    options: {
      listProperties: ['id', 'tipo', 'conteudo', 'fonte', 'createdAt', 'updatedAt'],
      properties: { conteudo: { type: 'richtext' }, },
    }
  },
  { resource: Avaliacao, 
    options: {
      //showProperties: ['id', 'nome', 'cnpj', 'email', 'createdAt', 'updatedAt'],
      listProperties: ['id', 'pacienteId', 'nota', 'createdAt', 'updatedAt']
    }
  },
];

const locale = {
  translations: translations,
}

const options = {
  databases: [], 
  resources: resources,
  rootPath: '/admin',
  locale,
  branding: {
    companyName: 'ChatBot - IFMS',
    softwareBrothers: false,
    logo: '/images/logo.png',
  },
}

module.exports = options