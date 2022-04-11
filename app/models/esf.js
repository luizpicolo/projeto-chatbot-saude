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
    },
    usuario_id:{
      type: DataTypes.INTEGER,
    }
  });

  esfs.associate = function(models) {
    esfs.hasMany(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }

  Esf.model_name = function () {
    return model_name
  };
  
  return Esf;
}