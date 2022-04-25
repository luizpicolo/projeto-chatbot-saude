const RiveScript = require('rivescript');

const ChatBot = function() {
  var self = this;
  self.rs = new RiveScript();
  self.rs.loadDirectory("/app/bot/brain").then(self.loading_done).catch(self.loading_error);

  self.loading_done =  async function(req){
    self.rs.sortReplies();
    return await self.rs.reply('nome', req, self);
  }

  self.loading_error = function(error){
    console.log("Error when loading files: " + error);
  }

  self.getDataExame = function() {
      return "20/12/2022"
  };
}

module.exports = ChatBot