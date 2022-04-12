module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'agendamento_consulta';
    const model_name = 'Agendamento_consultas';
  
    const Agendamento_consultas= sequelize.define(table_name, {
      data_nascimento: {
        type: DataTypes.DATE,
      },
    });
  
    Agendamento_consultas.associate = (models) => {
        models.Agendamento_consultas.belongsToMany(models.Paciente, {
          as: 'pacientes',
          through: Agendamento_consultas,
          foreignKey: 'id',
          otherKey: 'paciente_id',
        });
        models.Agendamento_consultas.belongsToMany(models.Esf, {
          as: 'esfs',
          through: Agendamento_consultas,
          foreignKey: 'id',
          otherKey: 'esf_id',
        });
    }

    Agendamento_consultas.model_name = function () {
      return model_name
    };
    
    return Agendamento_consultas;
  }