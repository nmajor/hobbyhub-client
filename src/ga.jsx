var ga = require('react-ga');
var gaId = 'UA-48130330-4';

function isBrowser() {try {return this===window;}catch(e){ return false;}}

module.exports = function() {
  if (isBrowser() && window.location.host.indexOf('dathobby.com') > -1) {
    ga.initialize(gaId);
    return ga;
  }
}()
