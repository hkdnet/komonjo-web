const ReactDom = require('react-dom');
const React = require('react');
const App = require('./App.jsx');

window.addEventListener('DOMContentLoaded', function() {
  ReactDom.render(
    <App />,
    document.getElementById('container')
  );
});
