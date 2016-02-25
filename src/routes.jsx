var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var history = require('./history');
var ga = require('./ga');

var Wrapper = require('./components/wrapper');
var Main = require('./components/main');
var Admin = require('./components/admin');
var Register = require('./components/register');
var Login = require('./components/login');
var HobbyForm = require('./components/hobby-form');
var HobbyList = require('./components/hobby-list');
var PageNotFound = require('./components/page-not-found');
var Users = require('./components/users');


function handleEnterRoute(props) {
  if (ga) { ga.pageview(props.location.pathname); }
}

module.exports = (
  <Router history={history}>
    <Route onEnter={handleEnterRoute} component={Wrapper}>
      <Route path="/" component={Main} />
      <Route path="/hobbies/:hobbySlug" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/admin/" component={Admin}>
        <Route path="users" component={Users} />
        <Route path="register" component={Register} />
        <Route path="hobbies/all" component={HobbyList} />
        <Route path="hobbies/new" component={HobbyForm} />
        <Route path="hobbies/:hobbySlug/edit" component={HobbyForm} />
      </Route>
      <Route path="/404" component={PageNotFound} />
    </Route>
    <Route path="*" component={PageNotFound}/>
  </Router>
);
