var Actions = require('./../app_actions'),
    booksData = require('./book_data');

module.exports = {

  // Load mock product data from localStorage into ProductStore via Action
  getData: function() {
    var data = booksData;
    Actions.receiveBooks(data);
  }

};