module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'pacientes';
    const model_name = 'Paciente';
  
    const Paciente = sequelize.define(table_name, {
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      telefone:{
        type: DataTypes.STRING,
      },
      sexo:{
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
      Paciente.hasMany(models.Esf, { foreignKey: 'id', as: 'esf' });
    };
  
    Paciente.model_name = function () {
      return model_name
    };
    
    return Paciente;
  }
  