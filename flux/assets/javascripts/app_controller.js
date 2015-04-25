var React = require('react/addons'),
    AuthorStore = require('./authors/author_store'),
    BookStore = require('./books/book_store'),
    AuthorsList = require('./components/authors_select'),
    BooksList = require('./components/books_select'),
    Result = require('./components/result'),
    luckyBtn = require('./components/lucky_btn');

var div   = React.createFactory('div');


function getAuthorState(){
  return {
    authors: AuthorStore.getAuthors(),
    books: BookStore.getSelectedAuthorBooks()
  }
}

var AppController = React.createClass({

  displayName: 'AppController',

  getInitialState: function(){
    return getAuthorState()
  },

  componentDidMount: function(){
    AuthorStore.addChangeListener(this._onChange);
    BookStore.addChangeListener(this._onChange);
  },

  // Отписываемся от обновлений
  componentWillUnmount: function() {
    AuthorStore.removeChangeListener(this._onChange);
    BookStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return div(null, [
      React.createElement(luckyBtn, null),
      React.createElement(AuthorsList, { authors: this.state.authors, selectedId: this.selectedAuthor().id }),
      React.createElement(BooksList, { books: this.state.books, selectedId: this.selectedBook().id }),
      React.createElement(Result, { authorName: this.selectedAuthor().name, bookName: this.selectedBook().name })
    ])
  },

  selectedAuthor: function(){
    return AuthorStore.getSelected();
  },

  selectedBook: function(){
    return BookStore.getSelected();
  },

  // Обновляем состояние Представления в ответ на событие "change"
  _onChange: function() {
    this.setState(getAuthorState());
  },


});

module.exports = AppController;