var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var history = require('./history');

var Wrapper = require('./components/wrapper');
var Main = require('./components/main');
var Register = require('./components/register');
var Login = require('./components/login');

module.exports = (
  <Router history={history}>
    <Route path="/" component={Wrapper}>
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="hobby/:hobbySlug" component={Main} />
    </Route>
  </Router>
);
