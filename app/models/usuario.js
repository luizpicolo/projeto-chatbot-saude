const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  
  const table_name = 'usuarios';
  const model_name = 'Usuario';

  const Usuario = sequelize.define(table_name, {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  Usuario.associate = function(models) {
    Usuario.belongsTo(models.Esf, { as: 'esf' }); 
  };

  Usuario.model_name = function () {
    return model_name
  };
  
  return Usuario;
}
