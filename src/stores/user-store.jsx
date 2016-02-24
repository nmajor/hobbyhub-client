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
    }.bind(this));
  },
  onRegisterUser: function(data) {
    Api.post('register', data)
    .then(function(user) {
      if (user.error) { console.log('Something went wrong'); console.log(user.error); return; }
      if (user._id) { history.push('/login'); }
      this.data.user = user;
      this.saveAndTrigger();
    }.bind(this));
  },
  onLoginUser: function(data) {
    Api.post('login', data)
    .then(function(user) {
      if (user.email) {
        if (user.error) { console.log('Something went wrong'); console.log(user.error); return; }
        if (user._id) { history.push('/'); }
        this.data.user = user;
        this.data.userLoggedIn = true;
        this.saveAndTrigger();
      }
    }.bind(this))
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
