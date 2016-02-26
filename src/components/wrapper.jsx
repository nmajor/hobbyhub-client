var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');

var Header = require('./header');
var Footer = require('./footer');
var Main = require('./main');

module.exports = React.createClass({
  componentWillMount: function() {
    UserActions.GetUser();
  },
  mixins: [
    Reflux.connect(UserStore),
  ],
  render: function() {
    return <div>
      <div id="wrapper">
        {this.renderHeader()}
        <div className="container">
          {this.renderLogo()}
          {this.props.children}
        </div>
        <div id="push"></div>
      </div>
      {this.renderFooter()}
    </div>
  },
  renderHeader: function() {
    if ( this.state.userLoggedIn ) {
      return <div>
        <Header />
      </div>
    }
  },
  renderLogo: function() {
    return <div className="row">
      <div className="col-md-12">
        <Link className="site-logo" to="/">dathobby.com</Link>
      </div>
    </div>
  },
  renderFooter: function() {
    if ( this.state.userLoggedIn ) {
      return <Footer />
    }
  }
});
