var React = require('react/addons');

var Actions = require('../app_actions');

var h1 = React.createFactory('h1'),
    span = React.createFactory('span');


var SelectsResult = React.createClass({

  displayName: 'Results Block',

  propTypes: {
    authorName: React.PropTypes.string,
    bookName: React.PropTypes.string
  },

  render: function() {
    return h1(null, [
      this.authorPart(),
      this.bookPart()
    ])
  },

  authorPart: function(){
    if (this.props.authorName) {
      return span(null, this.props.authorName);
    }
  },

  bookPart: function(){
    if (this.props.bookName) {
      return span(null, ' написал произведение «' + this.props.bookName + '»');
    }
  }
});

module.exports = SelectsResult;