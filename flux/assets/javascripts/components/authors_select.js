var React = require('react/addons');

var Actions = require('../app_actions');

var div   = React.createFactory('div'),
    select = React.createFactory('select'),
    option = React.createFactory('option');

var AuthorsSelect = React.createClass({

  displayName: 'AuthorSelect',

  selectAuthor: function(event){
    Actions.selectAuthor(event.target.value);
  },

  render: function() {
    if (this.props.authors.length){
      var options = [option({key: 'author_null'}, 'Выберите автора')];
      this.props.authors.forEach(function(author){
        options.push(option({
                        value: author.id,
                        key: 'author_' + author.id + '_' + author.name,
                    }, author.name))
      });
      return select({onChange: this.selectAuthor, value: this.props.selectedId}, options);
    } else {
      return div(null, 'Authors will be here')
    }
  }

});

module.exports = AuthorsSelect;