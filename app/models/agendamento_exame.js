module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'agendamento_exames';
    const model_name = 'AgendamentoExame';
  
    const AgendamentoExame = sequelize.define(table_name, {      
      data_agendamento: {
        type: DataTypes.DATE,
      },
    });
  
    AgendamentoExame.associate = function(models) {
      this.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    };
    
    AgendamentoExame.model_name = function () {
      return model_name
    };
    
    return AgendamentoExame;
  }
