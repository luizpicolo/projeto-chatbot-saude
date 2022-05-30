const {Esf, Usuario, Paciente, Informacao, AgendamentoExame} = require('../app/models');

const resources = [
  { resource: Esf, 
    options: {
      listProperties: ['id', 'nome', 'cnpj', 'email', 'createdAt', 'updatedAt']
    }
  },
  { resource: Usuario, 
    options: { 
      listProperties: ['id', 'nome', 'email', 'esf_id', 'createdAt', 'updatedAt']
    }
  },
  { resource: Paciente, 
    options: { 
      listProperties: ['id', 'nome', 'telefone', 'esf_id', 'createdAt', 'updatedAt']
    }
  }, 
  { resource: AgendamentoExame, 
    options: {
      listProperties: ['id', 'paciente_id', 'data_agendamento', 'horario_previsto', 'dia_previsto', 'status', 'createdAt', 'updatedAt']
    }
  },
  { resource: Informacao, 
    options: {
      listProperties: ['id', 'tipo', 'conteudo', 'fonte', 'createdAt', 'updatedAt'],
      properties: { conteudo: { type: 'richtext' }, },
    }
  },
];

const locale = {
  translations: {
    labels: {
      loginWelcome: '',
    },
    messages: {
      loginWelcome: '',
    },
  },
};

const options = {
  locale: { language: 'en' },
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