const express = require('express');
const router = express.Router();
var BotController = require('../app/controllers/bot_controller');

router.post('/mensagem', BotController.mensagem);

module.exports = router;
