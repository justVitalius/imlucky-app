var React = require('react/addons');

var Actions = require('../app_actions');

var button   = React.createFactory('button');

var BooksSelect = React.createClass({

  displayName: 'Books Select',

  render: function() {
    return button({onClick: this._clickHandler}, 'Мне повезет');
  },

  _clickHandler: function(event){
    Actions.imLuckyClick();
  }

});

module.exports = BooksSelect;