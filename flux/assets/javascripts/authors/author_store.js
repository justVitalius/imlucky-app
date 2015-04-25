var AppDispatcher = require('./../app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./../app_constants');
var Utils = require('./../utils');
var _ = require('underscore');

// Define initial data points
var _authors = [], _selected = {};

// Method to load product data from mock API
function loadAuthorData(data) {
  _authors = data;
}

// Method to set the currently selected product variation
function setSelected(id) {
  _selected = _.find(_authors, {id: parseInt(id)}) || {};
}

function selectRandomAuthor(){
  var randomId = Utils.random(1, _authors.length);
  setSelected(randomId);
}


// Extend ProductStore with EventEmitter to add eventing capabilities
var AuthorStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getAuthors: function() {
    return _authors;
  },

  // Return selected Product
  getSelected: function(){
    return _selected;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AuthorStore.dispatch = AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    case Constants.RECEIVE_AUTHORS:
      loadAuthorData(action.data);
      break;

    case Constants.SELECT_AUTHOR:
      setSelected(action.data);
      break;

    case Constants.LUCKY_CLICK:
      selectRandomAuthor();
      break;


    default:
      return true;
  }

  // If action was responded to, emit change event
  AuthorStore.emitChange();

  return true;

});

module.exports = AuthorStore;