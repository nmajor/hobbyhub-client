var React = require('react');
var Reflux = require('reflux');

var UserStore = require('../stores/user-store');
var PageNotFound = require('./page-not-found');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(UserStore),
  ],
  render: function() {
    return <div className="admin">
      {this.renderContent()}
    </div>
  },
  renderContent: function() {
    if (this.state.userLoggedIn) {
      return this.props.children
    } else {
      return <PageNotFound />
    }
  }
});
