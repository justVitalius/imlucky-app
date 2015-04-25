var React = window.React = require('react');

var authorApi = require('./authors/author_api'),
    bookApi = require('./books/book_api');

var AuthorsListApp = require('./app_controller.js');

setTimeout(function(){
  authorApi.getAuthorData();
  bookApi.getData();
}, 10);


React.render(
  React.createElement(AuthorsListApp, null),
  document.getElementById('js-app')
);
