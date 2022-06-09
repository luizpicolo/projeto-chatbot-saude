module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'agendamento_exames';
    const model_name = 'AgendamentoExame';
  
    const AgendamentoExame = sequelize.define(table_name, {      
      data_agendamento: {
        type: DataTypes.DATE,
      },
      horario_previsto:{
        type: DataTypes.STRING,
      },
      dia_previsto:{
        type: DataTypes.STRING,
      },
      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      hooks: {
        beforeUpdate : (record, options) => {
          console.log(record);
          //bot.sendMessage(chatid, mensagem); 
        }
      }
    });
  
    AgendamentoExame.associate = function(models) {
      AgendamentoExame.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    };
    
    AgendamentoExame.model_name = function () {
      return model_name
    };
    
    return AgendamentoExame;
  }
