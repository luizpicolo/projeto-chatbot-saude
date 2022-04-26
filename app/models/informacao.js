module.exports = (sequelize, DataTypes) => {
  
    const table_name = 'informacoes';
    const model_name = 'Informacao';
  
    const Informacao = sequelize.define(table_name, {
      conteudo: {
        type: DataTypes.STRING,
      },
      fonte: {
        type: DataTypes.STRING,
      },
      tipo:{
        type: DataTypes.STRING,
      }
    });
  
    Informacao.model_name = function () {
      return model_name
    };
    
    return Informacao;
  }
  