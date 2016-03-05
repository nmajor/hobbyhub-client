var ga = require('react-ga');
var gaId = 'UA-48130330-4';

module.exports = function() {
  if (window.location.host.indexOf('dathobby.com') > -1) {
    ga.initialize(gaId);
    return ga;
  }
}()
