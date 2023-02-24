const chai = require('chai');
const { before } = require('mocha');
const factory = require('factory-girl').factory;
const expect = chai.expect;
const { Paciente, Esf } = require('../../../app/models');
const ChatBot = require('../../../bot/models');

describe('.verificarCadastroPaciente', () => {

  before( async () => {
    factory.define('esf', Esf, {
      //id: factory.sequence('Esf.id', (n) => n),
      name: 'Esf Name',
      email: 'email_esf@email',
      cnpj: '000000000'
    });

    const esf = await factory.build('esf');

    factory.define('paciente', Paciente, {
      //id: factory.sequence('Paciente.id', (n) => n),
      name: 'Bob',
      contato: 'email@email',
      cpf: '000000000',
      esfId: esf.id,
      telegran_id: 1,
      whatsapp_id: 2
    });
  })

  it('should return null if no paciente is found', async () => {
    describe('with', () => {
      const chatbot = new ChatBot();

      it('telegran_id is not present', async() => {
        chatbot.messager = 'telegran_id';
        chatbot.id = 3;

        const result = await chatbot.verificarCadastroPaciente();
        expect(result).to.be.null;
      });

      it('whatsapp_id is not present', async() => {
        chatbot.messager = 'whatsapp_id';
        chatbot.id = 3;

        const result = await chatbot.verificarCadastroPaciente();
        expect(result).to.be.null;
      })
    });
    
  });

  it('should return paciente if no paciente is found', async () => {
    const chatbot = new ChatBot();
    const paciente = await factory.build('paciente');

    describe('with', () => {
      it('telegran_id present', async() => {
        chatbot.messager = 'telegran_id';
        chatbot.id = paciente.telegran_id;

        const result = await chatbot.verificarCadastroPaciente();
        expect(parseInt(result.telegran_id)).to.be.eq(paciente.telegran_id);
      });

      it('whatsapp_id present', async() => {
        chatbot.messager = 'whatsapp_id';
        chatbot.id = paciente.whatsapp_id;;

        const result = await chatbot.verificarCadastroPaciente();
        expect(parseInt(result.whatsapp_id)).to.be.eq(paciente.whatsapp_id);
      })
    });
    
  });

  it('should return null if an error occurs', async () => {
    const chatbot = new ChatBot();
    const paciente = await factory.build('paciente');

    chatbot.messager = null;
    chatbot.id = paciente.telegran_id;

    const result = await chatbot.verificarCadastroPaciente();
    console.log(result);
    expect(result).to.be.null;
  });
});
