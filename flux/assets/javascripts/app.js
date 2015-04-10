var React = window.React = require('react');
var author_api = require('./author_api');

var AuthorsListApp = React.createFactory(require('./authors_controller.js'));

console.log('start timer');
setTimeout(function(){
  author_api.getAuthorData();
  console.log('stop timer');
}, 200);


React.render(
  React.createElement(AuthorsListApp, null),
  document.getElementById('js-app')
);
