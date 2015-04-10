var React = require('react/addons');

var Actions = require('../author_actions');

var div   = React.createFactory('div'),
    select = React.createFactory('select'),
    option = React.createFactory('option');

var BookSelectableApp = React.createClass({

  selectAuthor: function(event){
    Actions.selectAuthor(event.target.value);
  },

  render: function() {
    if (this.props.authors.length){
      var options = [];
      this.props.authors.forEach(function(author){
        options.push(option({value: author.id}, author.name))
      });
      return select({onChange: this.selectAuthor}, options);
    } else {
      return div(null, 'React app loaded')
    }
  }

});

module.exports = BookSelectableApp;