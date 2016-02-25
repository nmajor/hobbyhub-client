var React = require('react');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');
var Reflux = require('reflux');

var Loading = require('./loading');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(UserStore),
  ],
  getInitialState: function() {
    return {
      email: null,
      password: null
    };
  },
  render: function() {
    return <div className="register row">
      <div className="col-md-4 col-md-offset-4">
        <h1>Register</h1>
        {this.renderForm()}
      </div>
    </div>
  },
  renderForm: function() {
    return <form onSubmit={this.formSubmit}>
      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          type="text"
          className="form-control"
          id="register-email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          className="form-control"
          id="register-password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          />
      </div>
      {this.renderLoading()}
      <button onClick={this.formSubmit} className="btn btn-success btn-block">Register</button>
    </form>
  },
  renderLoading: function() {
    if (this.state.registeringUser) {
      return <div><span className="text-loader"><Loading /></span> Submitting</div>
    }
  },
  handleEmailChange: function(event) {
    this.setState({email: event.target.value});
  },
  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },
  formSubmit: function(evt) {
    evt.preventDefault();
    UserActions.RegisterUser({email: this.state.email, password: this.state.password});
  }
});
