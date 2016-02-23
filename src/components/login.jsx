var React = require('react');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');
var Reflux = require('reflux');

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
    return <div className="login row">
      <div className="col-md-4 col-md-offset-4">
        <h1>Login</h1>
        {this.renderForm()}
      </div>
    </div>
  },
  renderForm: function() {
    return <form onSubmit={this.formSubmit}>
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
          <div className="input-group">
            <span className="input-group-addon">@</span>
            <input
              type="text"
              className="form-control"
              id="login-email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              />
          </div>
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          className="form-control"
          id="login-password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          />
      </div>
      <button onClick={this.formSubmit} className="btn btn-success btn-block">Login</button>
    </form>
  },
  handleEmailChange: function(event) {
    this.setState({email: event.target.value});
  },
  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },
  formSubmit: function(evt) {
    evt.preventDefault();
    UserActions.LoginUser({email: this.state.email, password: this.state.password});
  }
});
