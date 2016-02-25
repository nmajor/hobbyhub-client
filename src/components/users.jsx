var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');

var Loading = require('./loading');

module.exports = React.createClass({
  componentWillMount: function() {
    UserActions.GetUsers();
  },
  mixins: [
    Reflux.connect(UserStore),
  ],
  render: function() {
    return <div className="users">
      {this.renderUserList()}
      <Link to="/admin/register">Register New User</Link>
    </div>
  },
  renderUserList: function() {
    if (!this.state.users && this.state.loadingUsers) {
      return <div><span className="text-loader"><Loading /></span> Loading users</div>
    } else if (!this.state.users) {return null;}

    return this.state.users.map(function(user, index) {
      return <div key={index} className="user bottom-bumper">{user.email}</div>
    })
  }
});
