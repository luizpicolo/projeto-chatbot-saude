const express = require('express');
const ChatBot = require("../models")
const latinize = require('latinize');
const whatsapp = require('../../config/tokens')
const port = 3001;

const client = require('twilio')(whatsapp.accountSid, whatsapp.authToken); 
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const chatbot = new ChatBot();

app.post('/message', async function(req, res, next) {
  const twiml = new MessagingResponse();
  twiml.message(await chatbot.loading_done(
    latinize(req.body['Body']), req.body['WaId'], 'whatsapp'
  ));
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports.start = app;