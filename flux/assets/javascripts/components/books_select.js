var React = require('react/addons');

var Actions = require('../app_actions');

var div   = React.createFactory('div'),
    select = React.createFactory('select'),
    option = React.createFactory('option');

var BooksSelect = React.createClass({

  displayName: 'Books Select',

  selectBook: function(event){
    Actions.selectBook(event.target.value);
  },

  render: function() {
    var options = [option({key: 'book_null'}, 'выберите произведение')];
    if (this.props.books.length){
      this.props.books.forEach(function(book){
        options.push(option({
                      value: book.id,
                      key: 'book_' + book.id + '_' + book.name,
                    }, book.name))
      });
    }
    return select({onChange: this.selectBook, value: this.props.selectedId}, options);
  }

});

module.exports = BooksSelect;