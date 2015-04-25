var Actions = require('./../app_actions'),
    authorData = require('./author_data');

module.exports = {

  // Load mock product data from localStorage into ProductStore via Action
  getAuthorData: function() {
    var data = authorData;
    Actions.receiveAuthors(data);
  }

};