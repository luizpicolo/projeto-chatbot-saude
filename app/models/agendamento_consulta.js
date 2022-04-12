module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'Agendamento_consultas';
    const model_name = 'Agendamento_consulta';
  
    const Agendamento_consulta = sequelize.define(table_name, {
      data_agendamento: {
        type: DataTypes.DATE,
      },
    });
  
    Agendamento_consulta.associate = (models) => {
        models.Agendamento_consulta.belongsTo(models.Paciente, {
          as: 'pacientes',
          through: Agendamento_consulta,
          foreignKey: 'id',
          otherKey: 'paciente_id',
        });
        models.Agendamento_consulta.belongsTo(models.Esf, {
          as: 'esfs',
          through: Agendamento_consulta,
          foreignKey: 'id',
          otherKey: 'esf_id',
        });
    }

    Agendamento_consulta.model_name = function () {
      return model_name
    };
    
    return Agendamento_consulta;
  }
