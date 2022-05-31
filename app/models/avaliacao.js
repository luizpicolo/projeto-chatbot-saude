module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'avaliacoes';
    const model_name = 'Avaliacao';
  
    const Avaliacao = sequelize.define(table_name, {      
      nota: {
        type: DataTypes.INTEGER,
      },
    });
  
   Avaliacao.associate = function(models) {
      Avaliacao.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    };
    
    Avaliacao.model_name = function () {
      return model_name
    };
    
    return Avaliacao;
  }
