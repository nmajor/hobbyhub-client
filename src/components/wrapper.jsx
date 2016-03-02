var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Helmet = require('react-helmet');

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
      {this.renderMeta()}
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
  renderMeta: function() {
    return <Helmet
        title="Home"
        titleTemplate="dathobby.com - %s"
        base={{"target": "_blank", "href": "http://dathobby.com/"}}
        meta={[
            {"name": "description", "content": "Your next hobby might be something you've never heard of before today."},
            {"property": "og:site_name", "content": "dathobby.com"},
        ]}
    />
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
