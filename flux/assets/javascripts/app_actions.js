var AppDispatcher = require('./app_dispatcher');
var Constants = require('./app_constants');

// Define actions object
var Actions = {

  receiveAuthors: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_AUTHORS,
      data: data
    })
  },

  receiveBooks: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_BOOKS,
      data: data
    })
  },

  selectAuthor: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.SELECT_AUTHOR,
      data: data
    })
  },

  selectBook: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.SELECT_BOOK,
      data: data
    })
  },

  imLuckyClick: function(data) {
    console.log('click');
    AppDispatcher.handleAction({
      actionType: Constants.LUCKY_CLICK,
      data: data
    })
  }
};

module.exports = Actions;