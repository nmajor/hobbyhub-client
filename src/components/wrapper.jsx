var React = require('react');
var Reflux = require('reflux');

var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');

var Header = require('./header');
var Main = require('./main');

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
        {this.renderHeader()}
        {this.props.children}
      </div>
    </div>
  },
  renderHeader: function() {
    if ( this.state.userLoggedIn ) {
      return <div>
        <div className="header-bumper"></div>
        <Header />
      </div>
    }
  }
});
