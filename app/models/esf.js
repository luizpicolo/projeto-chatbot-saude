module.exports = (sequelize, DataTypes) => {
  
  const table_name = 'esfs';
  const model_name = 'Esf';

  const Esf = sequelize.define(table_name, {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    cnpj:{
      type: DataTypes.STRING,
    }
  });

  Esf.associate = function(models) {
    Esf.hasMany(models.Usuario, { as: 'usuarios' }); 
    Esf.hasMany(models.Paciente, { as: 'pacientes' }); 
  };

  Esf.model_name = function () {
    return model_name
  };

  return Esf;
}
