const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
const options = require('./config/options.js');
AdminJS.registerAdapter(AdminJSSequelize);
const { Usuario } = require('./app/models');
const bcrypt = require('bcryptjs');

const adminJs = new AdminJS(options)

if (process.env.NODE_ENV == 'production'){
  module.exports = adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      const usuario = await Usuario.findOne({ email })
      if (usuario) {
        const matched = await bcrypt.compare(password, usuario.password)
        if (matched) {
          return usuario
        }
      }
      return false
    },
    cookieName: 'adminjs',
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  })
} else {
  module.exports = adminRouter = AdminJSExpress.buildRouter(adminJs);
}