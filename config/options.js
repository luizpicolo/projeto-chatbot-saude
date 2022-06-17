const {Esf, Usuario, Paciente, Informacao, Agendamento, Avaliacao} = require('../app/models');
const translations = require('./translations');

const resources = [
  { resource: Esf, 
    options: {
      showProperties: ['id', 'name', 'cnpj', 'email', 'createdAt', 'updatedAt'],
      listProperties: ['id', 'name', 'cnpj', 'email', 'createdAt', 'updatedAt']
    }
  },
  { resource: Usuario, 
    options: { 
      listProperties: ['id', 'name', 'email', 'esfId', 'admin', 'createdAt', 'updatedAt']
    }
  },
  { resource: Paciente, 
    options: { 
      showProperties: ['id', 'name', 'contato', 'esfId', 'createdAt', 'updatedAt'],
      listProperties: ['id', 'name', 'contato', 'esfId', 'createdAt', 'updatedAt']
    }
  }, 
  { resource: Agendamento, 
    options: {
      listProperties: ['id', 'pacienteId', 'data_agendamento', 'dia_previsto', 'horario_previsto', 'status', 'createdAt', 'updatedAt'],
      // properties: {
      //   data_agendamento: {
      //     props: { dateFormat: "dd/MM/yyyy" }
      //   }
      // }
      properties: { 
        //pacienteId: { type: 'reference' },
        data_agendamento: { type: 'datetime' }
      },
      //parent: { name: 'id' },
      //sort: { direction: 'desc' },
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
      //showProperties: ['id', 'name', 'cnpj', 'email', 'createdAt', 'updatedAt'],
      listProperties: ['id', 'pacienteId', 'nota', 'createdAt', 'updatedAt']
    }
  },
];

const locale = {
  translations: translations
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