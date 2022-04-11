module.exports = (sequelize, DataTypes) => {
  const table_name = 'usuarios';
  const model_name = 'Usuario';

  const Usuario = sequelize.define(table_name, {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  Usuario.model_name = function () {
    return model_name
  };
  
  return Usuario;
}