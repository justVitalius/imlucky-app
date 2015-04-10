var AppDispatcher = require('./app_dispatcher');
var Constants = require('./author_constants');

// Define actions object
var Actions = {

  // Receive inital product data
  receiveAuthors: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_AUTHORS,
      data: data
    })
  },

  selectAuthor: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.SELECT_AUTHOR,
      data: data
    })
  }
};

module.exports = Actions;