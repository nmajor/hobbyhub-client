var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Reflux = require('reflux');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(UserStore),
  ],
  render: function() {
    return <nav className="navbar navbar-inverse navbar-fixed-top header">
      <div className="container-fluid">
        {this.renderNav()}
        {this.renderUserActions()}
      </div>
    </nav>
  },
  renderNav: function() {
    if (this.state.userLoggedIn && this.state.user) {
      return <ul className="nav navbar-nav">
        <li><Link to="/hobby/new">Add Hobby</Link></li>
      </ul>
    } else {
      return null;
    }
  },
  renderUserActions: function() {
    if (this.state.userLoggedIn && this.state.user) {
      return <ul className="nav navbar-nav navbar-right">
        <li><a className="disabled" href="#">{this.state.user.email}</a></li>
        <li><a href="#" onClick={this.handleLogoutClick}>Log Out</a></li>
      </ul>
    }
  },
  handleLogoutClick: function() {
    UserActions.LogoutUser();
  }
});
