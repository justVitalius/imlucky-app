var AppDispatcher = require('./../app_dispatcher');
var AuthorStore = require('./../authors/author_store');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./../app_constants');
var Utils = require('./../utils');
var _ = require('underscore');

var _books = [],
    _selectedAuthorBooks = [],
    _selected = {};

// Method to load product data from mock API
function loadBooksData(data) {
  _books = data;
}

function setSelectedAuthorBooks(authorId){
  _selectedAuthorBooks = _.where(_books, {authorId: parseInt(authorId)});
  _selected = {};
}

// Method to set the currently selected product variation
function setSelected(id) {
  _selected = _.find(_selectedAuthorBooks, {id: parseInt(id)}) || {};
}

function selectRandomBook(){
  var authorId = AuthorStore.getSelected().id,
      randomBookIndex,
      randomBookId;

  setSelectedAuthorBooks(authorId);
  randomBookIndex = Utils.random(1, _selectedAuthorBooks.length) - 1;
  randomBookId = (_selectedAuthorBooks[randomBookIndex] || {}).id;
  setSelected(randomBookId);
}

var BooksStore = _.extend({}, EventEmitter.prototype, {

  getBooks: function() {
    return _books;
  },

  getSelected: function(){
    return _selected;
  },

  getSelectedAuthorBooks: function(){
    return _selectedAuthorBooks;
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
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    case Constants.RECEIVE_BOOKS:
      loadBooksData(action.data);
      break;

    case Constants.SELECT_AUTHOR:
      setSelectedAuthorBooks(action.data);
      break;

    case Constants.SELECT_BOOK:
      setSelected(action.data);
      break;

    case Constants.LUCKY_CLICK:
      AppDispatcher.waitFor([AuthorStore.dispatch]);
      selectRandomBook();
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  BooksStore.emitChange();

  return true;

});

module.exports = BooksStore;