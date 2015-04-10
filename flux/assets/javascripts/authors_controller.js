var React = require('react/addons'),
    AuthorStore = require('./author_Store'),
    AuthorsList = React.createFactory(require('./components/authors_list'));

var div   = React.createFactory('div');


function getAuthorState(){
  return {
    authors: AuthorStore.getAuthors()
  }
}



var AuthorsController = React.createClass({

  getInitialState: function(){
    return getAuthorState()
  },

  componentDidMount: function(){
    AuthorStore.addChangeListener(this._onChange);
  },

  // Отписываемся от обновлений
  componentWillUnmount: function() {
    AuthorStore.removeChangeListener(this._onChange);
  },

  // Обновляем состояние Представления в ответ на событие "change"
  _onChange: function() {
    this.setState(getAuthorState());
  },

  render: function() {
    return React.createElement(AuthorsList, { authors: this.state.authors });
  }

});

module.exports = AuthorsController;