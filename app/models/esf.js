module.exports = (sequelize, DataTypes) => {
  
  const table_name = 'esfs';
  const model_name = 'Esf';

  const Esf = sequelize.define(table_name, {
    nome: {
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
    Esf.hasMany(models.Usuario, { foreignKey: 'esf_id' }); 
    Esf.hasMany(models.Paciente, { foreignKey: 'esf_id' }); 
  };

  Esf.model_name = function () {
    return model_name
  };
  
  return Esf;
}
