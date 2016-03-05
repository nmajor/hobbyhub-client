var Reflux = require('reflux');
var Api = require('../utils/api');
var UserActions = require('../actions/user-actions');
var history = require('../history');

module.exports = Reflux.createStore({
  listenables: UserActions,
  data: {},
  getInitialState: function() {
    this.loadUserStoreData();
    return this.data;
  },
  onGetUser: function() {
    Api.get('user')
    .then(function(user) {
      if (user.error) {
        this.data.user = null;
        this.data.userLoggedIn = false;
        this.saveAndTrigger();
      } else {
        this.data.user = user;
        this.data.userLoggedIn = true;
        this.saveAndTrigger();
      }
    }.bind(this))
    .catch(function(err) {});
  },
  onGetUsers: function() {
    this.data.loadingUsers = true;
    this.trigger(this.data);

    Api.get('users')
    .then(function(users) {
      this.data.users = users;
      this.data.loadingUsers = false;
      this.trigger(this.data);
    }.bind(this));
  },
  onRegisterUser: function(data) {
    this.data.registeringUser = true;
    this.trigger(this.data);

    Api.post('register', data)
    .then(function(user) {
      if (user.error) { throw user.error; }
      if (user._id) { history.push('/admin/users'); }
      this.data.user = user;
      this.data.registeringUser = false;
      this.saveAndTrigger();
    }.bind(this))
    .catch(function(err) {
      console.log('registration error');
      this.data.registeringUser = false;
      this.trigger(this.data);
    }.bind(this));
  },
  onLoginUser: function(data) {
    this.data.loggingInUser = true;
    this.trigger(this.data);

    Api.post('login', data)
    .then(function(user) {
      if (user.error) { console.log('Something went wrong'); console.log(user.error); return; }
      if (user.email) {
        if (user._id) { history.push('/'); }
        this.data.user = user;
        this.data.loggingInUser = false;
        this.data.userLoggedIn = true;
        this.saveAndTrigger();
      }
    }.bind(this))
    .catch(function(err) {
      console.log('login error');
      this.data.loggingInUser = false;
      this.trigger(this.data);
    }.bind(this));
  },
  onLogoutUser: function() {
    Api.get('logout')
    .then(function() {
      this.data.user = null;
      this.data.userLoggedIn = false;
      this.saveAndTrigger();
    }.bind(this))
  },
  saveAndTrigger: function() {
    this.saveUserStoreData();
    this.trigger(this.data);
  },
  saveUserStoreData: function() {
    localStorage.setItem("UserStoreData", JSON.stringify(this.data));
  },
  loadUserStoreData: function() {
    if (localStorage.UserStoreData) { this.data = JSON.parse(localStorage.UserStoreData); }
  }
});
