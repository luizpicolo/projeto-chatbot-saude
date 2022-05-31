module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'pacientes';
    const model_name = 'Paciente';
  
    const Paciente = sequelize.define(table_name, {
      nome: {
        type: DataTypes.STRING,
      },
      contato:{
        type: DataTypes.STRING,
      },
      telegran_id: {
        type: DataTypes.STRING,
      },
      whatsapp_id: {
        type: DataTypes.STRING,
      },
      cpf:{
        type: DataTypes.STRING,
      },
      esf_id:{
        type: DataTypes.INTEGER,
      }
    });
  
    Paciente.associate = function(models) {
      Paciente.belongsTo(models.Esf, { foreignKey: 'esf_id', as: 'esf' });
      Paciente.hasMany(models.AgendamentoExame, { foreignKey: 'paciente_id', as: 'agendamentos' });
    };
  
    Paciente.model_name = function () {
      return model_name
    };
    
    return Paciente;
  }
  