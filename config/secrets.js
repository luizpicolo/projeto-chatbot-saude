require('dotenv/config');

module.exports = {
  telegran:  {
    token: process.env.TELEGRAN_TOKEN
  },
  
  whatsapp: {
    from: process.env.WHATSAPP_FROM,
    accountSid: process.env.WHATSAPP_ACCOUNTSID,
    authToken: process.env.WHATSAPP_AUTHTOKEN
  },

  webhooks: {
    url: process.env.WEBHOOK_URL
  }
}