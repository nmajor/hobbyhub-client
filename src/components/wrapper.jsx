var React = require('react');
var Reflux = require('reflux');

var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');

module.exports = React.createClass({
  componentWillMount: function() {
    UserActions.GetUser();
  },
  mixins: [
    Reflux.connect(UserStore),
  ],
  render: function() {
    return <div className="wrapper">
      <div className="container">
        {this.props.children}
      </div>
    </div>
  }
});
