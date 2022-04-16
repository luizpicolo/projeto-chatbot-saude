const Paciente = require('../models/paciente');
const ESF = require('../models/esf');

module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'agendamento_consultas';
    const model_name = 'AgendamentoConsulta';
  
    const AgendamentoConsulta = sequelize.define(table_name, {      
      data_agendamento: {
        type: DataTypes.DATE,
      },
    });
  
    AgendamentoConsulta.associate = function(models) {
      this.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    };
    
    AgendamentoConsulta.model_name = function () {
      return model_name
    };
    
    return AgendamentoConsulta;
  }
